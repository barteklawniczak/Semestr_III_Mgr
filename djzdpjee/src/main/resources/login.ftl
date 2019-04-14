<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">
    <div class="registration-form">
        <#if error??>
            <p style="color:red;">${error}</p>
        </#if>
        <form action="/login" method="post" enctype="application/x-www-form-urlencoded">
            <div class="input-div">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>

            <div class="input-div">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>

            <input class="submit-button" type="submit" value="Login">
        </form>
    </div>
</@layout.mainLayout>