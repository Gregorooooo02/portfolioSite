<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="2.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:cds="plytoteka">
	
<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	
<!--Klucze do dokumentu bazowego-->
<xsl:key name="genreKey" match="/cds:exercise/cds:genres/cds:genre" use="@genreId"/>
<xsl:key name="studentKey" match="/cds:exercise/cds:students/cds:student" use="@studentId"/>

<!--Generowanie raportu-->
<xsl:template match="/">
	<xsl:element name="raport">	
		<xsl:element name="library">
			<xsl:for-each select="cds:exercise/cds:library/cds:disk">
			<xsl:sort select="@diskId"/>
			<xsl:element name="disk">
				<xsl:element name="author">
					<xsl:value-of select="cds:author"/>
				</xsl:element>
				<xsl:element name="title">
					<xsl:value-of select="cds:title"/>
				</xsl:element>
				<xsl:element name="released">
					<xsl:value-of select="cds:info/cds:released"/>
				</xsl:element>
				<xsl:element name="howManySongs">
					<xsl:value-of select="cds:info/cds:howManySongs"/>
				</xsl:element>
				<xsl:element name="length">
					<xsl:value-of select="cds:info/cds:length/@time"/>
				</xsl:element>
				<xsl:element name="price">
					<xsl:variable name="price" select="concat(cds:info/cds:price,' ',cds:info/cds:price/@currency)"/>
					<xsl:value-of select="$price"/>
				</xsl:element>
				<xsl:element name="ratings">
					<xsl:value-of select="cds:info/cds:ratings"/>
				</xsl:element>
				<xsl:element name="albumCover">
					<xsl:value-of select="cds:albumCover/@URL"/>
				</xsl:element>
				<xsl:element name="genre">
					<xsl:variable name="name">
						<xsl:value-of select="key('genreKey',@genreId)"/>
					</xsl:variable>
					<xsl:value-of select="$name"/>
				</xsl:element>
				<xsl:element name="student">
					<xsl:variable name="name">
						<xsl:value-of select="key('studentKey',@studentId)"/>
					</xsl:variable>
					<xsl:value-of select="$name"/>
				</xsl:element>
			</xsl:element>
			</xsl:for-each>
		</xsl:element>
	
		<xsl:element name="statistics">
			<xsl:element name="numberOfDisks">
				<xsl:variable name="number"
						  	select="count(cds:exercise/cds:library/cds:disk)"/>
				<xsl:value-of select="$number"/>
			</xsl:element>
			<xsl:element name="numberOfGenres">
				<xsl:variable name="number"
						  	select="count(cds:exercise/cds:genres/cds:genre)"/>
				<xsl:value-of select="$number"/>
			</xsl:element>
			<xsl:element name="numberOfStudents">
				<xsl:variable name="number"
						  	select="count(cds:exercise/cds:students/cds:student)"/>
				<xsl:value-of select="$number"/>
			</xsl:element>
			<xsl:element name="averageRating">
				<xsl:variable name="average"
						  	select="avg(cds:exercise/cds:library/cds:disk/cds:info/cds:ratings)"/>
				<xsl:value-of select="format-number($average,'#.##')"/>
			</xsl:element>
			<xsl:element name="bestRating">
				<xsl:for-each select="cds:exercise/cds:library/cds:disk">
				<xsl:sort select="cds:info/cds:ratings" order="descending"/>
				<xsl:if test="position() = 1">
					<xsl:element name="rating">
						<xsl:value-of select="cds:info/cds:ratings"/>
					</xsl:element>
					<xsl:element name="title">
						<xsl:value-of select="cds:title"/>
					</xsl:element>
					<xsl:element name="author">
						<xsl:value-of select="cds:author"/>
					</xsl:element>
				</xsl:if>
				</xsl:for-each>
			</xsl:element>
			<xsl:element name="worstRating">
				<xsl:for-each select="cds:exercise/cds:library/cds:disk">
				<xsl:sort select="cds:info/cds:ratings"/>
				<xsl:if test="position() = 1">
					<xsl:element name="rating">
						<xsl:value-of select="cds:info/cds:ratings"/>
					</xsl:element>
					<xsl:element name="title">
						<xsl:value-of select="cds:title"/>
					</xsl:element>
					<xsl:element name="author">
						<xsl:value-of select="cds:author"/>
					</xsl:element>
				</xsl:if>
				</xsl:for-each>
			</xsl:element>
			<xsl:element name="averagePrice">
				<xsl:variable name="average"
						  	select="avg(cds:exercise/cds:library/cds:disk/cds:info/cds:price)"/>
				<xsl:value-of select="format-number($average,'#.##')"/>
			</xsl:element>
			<xsl:element name="sumOfPrices">
				<xsl:variable name="sum"
						  	select="sum(cds:exercise/cds:library/cds:disk/cds:info/cds:price)"/>
				<xsl:value-of select="$sum"/>
			</xsl:element>
			<xsl:element name="generatedDate">
				<xsl:value-of select="format-date(current-date(),'[D01].[M01].[Y0001]')"/>
			</xsl:element>
		</xsl:element>
	</xsl:element>
</xsl:template>

</xsl:stylesheet>