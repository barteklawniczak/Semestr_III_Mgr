<#-- @ftlvariable name="loggedUser" type="com.blawniczak.model.User" -->

<#macro mainLayout title="Welcome">
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>My ktor application</title>
        <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body>
    <div class="pure-g">
        <div class="sidebar pure-u-1 pure-u-md-1-4">
            <div class="header">
                <#if loggedUser??>
                    <a class="header-link" href="/accounts">List of accounts</a>
                    <a class="header-link" href="/edit">Edit account</a>
                    <a class="header-link" href="/logout">Sign out</a>
                <#else>
                    <a class="header-link" href="/register">Register</a>
                    <a class="header-link" href="/login">Login</a>
                </#if>
            </div>
        </div>

        <div>
            <#nested />
        </div>
        <!--<div class="footer">
            My Ktor Application - Bartłomiej Ławniczak 2019
        </div>-->
    </div>
    </body>
    </html>
</#macro>