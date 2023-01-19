<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="2.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="text" encoding="UTF-8"/>

<xsl:template match="/">
	<xsl:text>+-------------------+------------------------------------+--------------+-----------------+---------+-----------+-------+-------------------+-----------------------+&#10;</xsl:text>
	<xsl:text>| Autor             | Tytul                              | Data wydania | Liczba piosenek | Dlugosc | Cena      | Ocena | Gatunek           | Ulubiona              |&#10;</xsl:text>
	<xsl:text>+-------------------+------------------------------------+--------------+-----------------+---------+-----------+-------+-------------------+-----------------------+&#10;</xsl:text>
	
	<xsl:for-each select="raport/library/disk">
		<xsl:apply-templates select="author" mode="format">
			<xsl:with-param name="width" select="20"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="title" mode='format'>
			<xsl:with-param name="width" select="37"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="released" mode='format'>
			<xsl:with-param name="width" select="15"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="howManySongs" mode='format'>
			<xsl:with-param name="width" select="18"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="length" mode='format'>
			<xsl:with-param name="width" select="10"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="price" mode='format'>
			<xsl:with-param name="width" select="12"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="ratings" mode='format'>
			<xsl:with-param name="width" select="8"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="genre" mode='format'>
			<xsl:with-param name="width" select="20"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="student" mode='format'>
			<xsl:with-param name="width" select="24"/>
		</xsl:apply-templates>
		<xsl:text>|&#10;</xsl:text>
	</xsl:for-each>
	<xsl:text>+-------------------+------------------------------------+--------------+-----------------+---------+-----------+-------+-------------------+-----------------------+&#10;</xsl:text>
</xsl:template>

<xsl:variable name="space">
	<xsl:text>                                      </xsl:text>
</xsl:variable>
<xsl:template match="node()" mode="format">
	<xsl:param name="width"/>
	<xsl:variable name="text" select="concat('| ',.)"/>
	<xsl:value-of select="substring(concat($text, $space), 1, $width)"/>
</xsl:template>

</xsl:stylesheet>