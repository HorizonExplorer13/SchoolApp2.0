CREATE TABLE [dbo].[Resultado](
	[UsuarioId] [int] NULL,
	[NombreUsuario] [nvarchar](100) NULL,
	[TotalCompra] [decimal](10, 2) NULL,
	[TotalIVA] [decimal](10, 2) NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Compras](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UsuarioId] [int] NULL,
	[ProductoId] [int] NULL,
	[Valor] [float] NULL,
	[Impuesto] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[ItemsIva](
	[IdProducto] [int] NOT NULL,
	[Porcentaje] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE proc [dbo].[XMLprocess](
@xml_usuarios XML,
    @xml_compras XML,
    @xml_itemsIva XML
)
as
begin
INSERT INTO Resultado (UsuarioId, NombreUsuario)
    SELECT
        UserData.value('(Id)[1]', 'INT') AS UsuarioId,
        UserData.value('(Nombre)[1]', 'NVARCHAR(100)') AS NombreUsuario
    FROM @xml_usuarios.nodes('/Data/Usuario') AS Users(UserData)

    -- Calcular el total de compra y el total de IVA para cada usuario
    UPDATE Resultado
    SET
        TotalCompra = ISNULL(
            (SELECT SUM(PurchaseData.value('(Valor)[1]', 'DECIMAL(10, 2)'))
             FROM @xml_compras.nodes('/Data/Item') AS Compras(PurchaseData)
             WHERE PurchaseData.value('(Usuario)[1]', 'INT') = Resultado.UsuarioId), 0),

        TotalIVA = ISNULL(
            (SELECT SUM(
                PurchaseData.value('(Valor)[1]', 'DECIMAL(10, 2)') * Iva.value('(Porcentaje)[1]', 'DECIMAL(5, 2)')
             )
             FROM @xml_compras.nodes('/Data/Item') AS Compras(PurchaseData)
             JOIN @xml_itemsIva.nodes('/Data/Producto') AS ItemsIva(Iva)
             ON PurchaseData.value('(Producto)[1]', 'INT') = Iva.value('(IdProducto)[1]', 'INT')
             WHERE PurchaseData.value('(Usuario)[1]', 'INT') = Resultado.UsuarioId), 0)

    
    SELECT DISTINCT UsuarioId, NombreUsuario, TotalCompra, TotalIVA
    FROM Resultado

	end
GO

DECLARE @xml_usuarios XML, @xml_compras XML, @xml_itemsIva XML
SET @xml_usuarios = '
<Data>
<Usuario><Id>14</Id><Nombre>Juan</Nombre></Usuario>
<Usuario><Id>17</Id><Nombre>Maria</Nombre></Usuario>
<Usuario><Id>25</Id><Nombre>Carlos</Nombre></Usuario>
<Usuario><Id>15</Id><Nombre>Fernanda</Nombre></Usuario>
</Data>'
 SET @xml_compras = '
<Data>
<Item><Usuario>14</Usuario><Producto>78</Producto><Valor>300</Valor></Item>
<Item><Usuario>17</Usuario><Producto>23</Producto><Valor>568</Valor></Item>
<Item><Usuario>17</Usuario><Producto>99</Producto><Valor>350</Valor></Item>
<Item><Usuario>14</Usuario><Producto>99</Producto><Valor>107</Valor></Item>
<Item><Usuario>25</Usuario><Producto>23</Producto><Valor>425</Valor></Item>
</Data>'
 SET @xml_itemsIva = '
<Data>
<Producto><IdProducto>23</IdProducto><Porcentaje>0.16</Porcentaje></Producto>
<Producto><IdProducto>99</IdProducto><Porcentaje>0.19</Porcentaje></Producto>
</Data>'

EXEC XMLprocess @xml_usuarios,@xml_compras,@xml_itemsIva