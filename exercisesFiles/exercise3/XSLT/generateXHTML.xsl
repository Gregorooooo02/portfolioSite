<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="2.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xhtml" encoding="UTF-8" 
doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" 
doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>

<xsl:template match="/">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
	<head>
		<title>OutputXHTMl</title>
		<style type="text/css">
			@keyframes colorHover {
			  	from {background-color: #ffff; color:#000000;}
			  	to {	background-color: #a5f; color: #ffff;}
			}
			
			h1 {
				text-align: center;
			}
			
			body {
				font-family: Helvetica Neue;
				font-size: 11pt;
				background-color: #ffff;
			}
			
			table {
				margin-left: auto;
				margin-right: auto;
				border: 1px solid black;
				border-radius: 10px;
			}
			
			table > caption {
				font-weight: bold;
				margin-bottom: 1%;
			}
			
			th {
				background-color: #8e00ff;
				color: #ffff;
				border: 1px solid black;
				border-radius: 10px;
			}
			
			th, td {
				text-align: center;
				padding: 4px;
				padding-bottom: 2px;
				padding-top: 2px;
				border: 1px solid black;
				border-radius: 10px;
			}
			
			td:hover {
				animation-name: colorHover;
				animation-duration: 300ms;
				animation-fill-mode: forwards;
			}
	
		</style>
	</head>
	<body>
		<h1>Płytoteka CD</h1>
		<table border="1">
			<tr>
				<th>Autor</th>
				<th>Tytuł</th>
				<th>Data wydania</th>
				<th>Ilość piosenek</th>
				<th>Czas trwania</th>
				<th>Cena</th>
				<th>Ocena</th>
				<th>Gatunek</th>
				<th>Ulubiona</th>
			</tr>
			<xsl:for-each select="raport/library/disk">
			<tr>
				<td>
					<xsl:value-of select="author"/>
				</td>
				<td>
					<xsl:value-of select="title"/>
				</td>
				<td>
					<xsl:value-of select="released"/>
				</td>
				<td>
					<xsl:value-of select="howManySongs"/>
				</td>
				<td>
					<xsl:value-of select="length"/>
				</td>
				<td>
					<xsl:value-of select="price"/>
				</td>
				<td>
					<xsl:value-of select="ratings"/>
				</td>
				<td>
					<xsl:value-of select="genre"/>
				</td>
				<td>
					<xsl:value-of select="student"/>
				</td>
			</tr>
			</xsl:for-each>
		</table>
		<div style="margin-top: 1%">
			<h1>Statystyki</h1>
			<table border="1">
				<caption>Liczba rekordów</caption>
				<tr>
					<th>Liczba płyt</th>
					<th>Liczba gatunków</th>
					<th>Liczba studentów</th>
				</tr>
				<tr>
					<td>
						<xsl:value-of select="raport/statistics/numberOfDisks"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/numberOfGenres"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/numberOfStudents"/>
					</td>
				</tr>
			</table>
		</div>
		<div style="margin-top: 5%">
			<table border="1">
				<caption>Dane o ocenach</caption>
				<tr>
					<th>Średnia ocen</th>
					<th>Najlepsza płyta</th>
					<th>Ocena</th>
					<th>Najgorsza płyta</th>
					<th>Ocena</th>
				</tr>
				<tr>
					<td>
						<xsl:value-of select="raport/statistics/averageRating"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/bestRating/title"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/bestRating/rating"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/worstRating/title"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/worstRating/rating"/>
					</td>
				</tr>
			</table>
		</div>
		<div style="margin-top: 5%">
			<table border="1">
				<caption>Dane o cenach</caption>
				<tr>
					<th>Średnia cena</th>
					<th>Suma cen</th>
				</tr>
				<tr>
					<td>
						<xsl:value-of select="raport/statistics/averagePrice"/>
					</td>
					<td>
						<xsl:value-of select="raport/statistics/sumOfPrices"/>
					</td>
				</tr>
			</table>
		</div>
	</body>
	</html>
</xsl:template>
</xsl:stylesheet>