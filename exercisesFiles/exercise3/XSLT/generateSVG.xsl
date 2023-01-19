<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="2.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml" indent="yes"/>

<xsl:template match="/">
	<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
		<rect width="100%" height="100%" fill="azure"/>
		
		<!-- Pierwszy diagram -->
		<g transform="translate(150,200)" font-family="Helvetica Neue">
		<line x1="-1" y1="50" x2="200" y2="50" stroke="black" stroke-width="2"/>
		<line x1="-1" y1="-150" x2="-1" y2="50" stroke="black" stroke-width="2"/>
		
		<rect x="0" y="-115" height="35" width="0" fill="purple">
			<animate attributeName="width" 
					 begin="0s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/numberOfDisks * 5}"/>
		</rect>
			<text text-anchor="end" x="40" y="-85" transform="rotate(-30)">
				Ilość płyt
			</text>
			<text text-anchor="start" x="0" y="-94">
				<xsl:value-of select="raport/statistics/numberOfDisks"/>
				<animate attributeName="x"
						 begin="0s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/numberOfDisks * 5) + 10}"/>
			 </text> 
		<rect x="0" y="-55" height="35" width="0" fill="yellow">
			<animate attributeName="width" 
					 begin="0.2s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/numberOfGenres * 5}"/>
		</rect>
			<text text-anchor="end" x="10" y="-35" transform="rotate(-30)">
				Ilość gatunków
			</text>
			<text text-anchor="start" x="0" y="-29">
				<xsl:value-of select="raport/statistics/numberOfGenres"/>
				<animate attributeName="x"
						 begin="0.2s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/numberOfGenres * 5) + 10}"/>
			</text> 
		<rect x="0" y="5" height="35" width="0" fill="red">
			<animate attributeName="width" 
					 begin="0.4s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/numberOfStudents * 5}"/>
		</rect>
			<text text-anchor="end" x="-20" y="20" transform="rotate(-30)">
				Ilość studentów
			</text>
			<text text-anchor="start" x="0" y="31">
				<xsl:value-of select="raport/statistics/numberOfStudents"/>
				<animate attributeName="x"
						 begin="0.4s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/numberOfStudents * 5) + 10}"/>
			</text> 
			<text x="-35" y="-160" font-weight="bold">
				Porównanie liczb płyt, gatunków i studentów.
			</text>
		</g>
		
		<!-- Drugi diagram -->
		<g transform="translate(150,500)" font-family="Helvetica Neue">
		<line x1="-1" y1="50" x2="200" y2="50" stroke="black" stroke-width="2"/>
		<line x1="-1" y1="-150" x2="-1" y2="50" stroke="black" stroke-width="2"/>
		
		<rect x="0" y="-115" height="35" width="0" fill="blue">
			<animate attributeName="width" 
					 begin="0.6s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/averageRating * 30}"/>
		</rect>
			<text text-anchor="end" x="40" y="-85" transform="rotate(-30)">
				Średnia ocen
			</text>
			<text text-anchor="start" x="0" y="-94">
				<xsl:value-of select="raport/statistics/averageRating"/>
				<animate attributeName="x"
						 begin="0.6s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/averageRating * 30) + 10}"/>
			</text> 
		<rect x="0" y="-55" height="35" width="0" fill="green">
			<animate attributeName="width" 
					 begin="0.8s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/bestRating/rating * 30}"/>
		</rect>
			<text text-anchor="end" x="10" y="-35" transform="rotate(-30)">
				Najlepsza ocena
			</text>
			<text text-anchor="start" x="0" y="-29">
				<xsl:value-of select="raport/statistics/bestRating/rating"/>
				<animate attributeName="x"
						 begin="0.8s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/bestRating/rating * 30) + 10}"/>
			</text> 
		<rect x="0" y="5" height="35" width="0" fill="red">
			<animate attributeName="width" 
					 begin="1.0s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/worstRating/rating * 30}"/>
		</rect>
			<text text-anchor="end" x="-20" y="20" transform="rotate(-30)">
				Najgorsza ocena
			</text>
			<text text-anchor="start" x="0" y="31">
				<xsl:value-of select="raport/statistics/worstRating/rating"/>
				<animate attributeName="x"
						 begin="1.0s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/worstRating/rating * 30) + 10}"/>
			</text> 
			 
			<text x="-120" y="-160" font-weight="bold">
				Porównanie średniej ocen z najlepiej i najgorzej ocenianą płytą
			</text>
		</g>
		
		<!-- Trzeci diagram -->
		<g transform="translate(150,800)" font-family="Helvetica Neue">
		<line x1="-1" y1="50" x2="250" y2="50" stroke="black" stroke-width="2"/>
		<line x1="-1" y1="-150" x2="-1" y2="50" stroke="black" stroke-width="2"/>
		
		<rect x="0" y="-115" height="60" width="0" fill="orange">
			<animate attributeName="width" 
					 begin="1.2s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/averagePrice * 2}"/>
		</rect>
			<text text-anchor="end" x="35" y="-75" transform="rotate(-30)">
				Średnia kwót
			</text>
			<text text-anchor="start" x="0" y="-79">
				<xsl:value-of select="raport/statistics/averagePrice"/>
				<animate attributeName="x"
						 begin="1.2s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/averagePrice * 2) + 10}"/>
			</text> 
		<rect x="0" y="-30" height="60" width="0" fill="#c06eff">
			<animate attributeName="width" 
					 begin="1.4s" 
					 dur="1.5s" 
					 fill="freeze" 
					 from="0" 
					 to="{raport/statistics/sumOfPrices * 0.2}"/>
		</rect>
			<text text-anchor="end" x="-10" y="5" transform="rotate(-30)">
				Suma kwót
			</text>
			<text text-anchor="start" x="0" y="11">
				<xsl:value-of select="raport/statistics/sumOfPrices"/>
				<animate attributeName="x"
						 begin="1.4s"
						 dur="1.5s"
						 fill="freeze"
						 from="10"
						 to="{(raport/statistics/sumOfPrices * 0.2) + 10}"/>
			</text> 
			
			<text x="-30" y="-160" font-weight="bold">
				Porównanie średniej kwót z sumą kwót
			</text>
		</g>
	</svg>
</xsl:template>

</xsl:stylesheet>