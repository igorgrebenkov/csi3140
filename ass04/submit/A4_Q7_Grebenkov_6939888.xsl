<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl = "http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" doctype-system="about:legacy-compat" />
    <xsl:template match="/">

        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta charset="utf-8"/>
                <title>Question 7</title>
                <style>
                    table 
                    {
                        border-collapse: collapse;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    th, td 
                    {
                        border: 1px solid black;
                        padding: 3px;
                        text-align: center;
                    }

                    th.thName 
                    {
                        background: black;
                        color: white;
                        font-size: 120%;
                    }
                </style>
            </head>

            <body>
                <table>
                    <xsl:for-each select="/nutritionFacts/foodItem">
                        <thead>
                        <tr>
                            <th class="thName" colspan="2"><xsl:value-of select="name"/></th>
                        </tr>
                        </thead>
                        <tr>
                            <th>Serving Size</th>
                            <td><xsl:value-of select="servingSize"/></td>
                        </tr>
                        <tr>
                            <th>Calories</th>
                            <td><xsl:value-of select="totalCalories"/></td>
                        </tr>
                        <tr>
                            <th>Fat Calories</th>
                            <td><xsl:value-of select="fatCalories"/></td>
                        </tr>
                        <tr>
                            <th>Fat</th>
                            <td><xsl:value-of select="fat"/></td>
                        </tr>
                        <tr>
                            <th>Saturated Fat</th>
                            <td><xsl:value-of select="saturatedFat"/></td>
                        </tr>
                        <tr>
                            <th>Cholesterol</th>
                            <td><xsl:value-of select="cholesterol"/></td>
                        </tr>
                        <tr>
                            <th>Sodium</th>
                            <td><xsl:value-of select="sodium"/></td>
                        </tr>
                        <tr>
                            <th>Carbohydrates</th>
                            <td><xsl:value-of select="carbohydrates"/></td>
                        </tr>
                        <tr>
                            <th>Fiber</th>
                            <td><xsl:value-of select="fiber"/></td>
                        </tr>
                        <tr>
                            <th>Sugar</th>
                            <td><xsl:value-of select="sugar"/></td>
                        </tr>
                        <tr>
                            <th>Protein</th>
                            <td><xsl:value-of select="protein"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
