
<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">
    <div class="registration-form">
        <#if error??>
        <p style="color:red;">${error}</p>
        </#if>

        <h3>Register your account</h3>

        <form action="/register" method="post" enctype="application/x-www-form-urlencoded">

            <div class="input-div">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="${user.email}"/>
            </div>

            <div class="input-div">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value="${user.name}"/>
            </div>

            <div class="input-div">
                <label for="surname">Surname</label>
                <input type="text" name=surname" id="surname" value="${user.surname}"/>
            </div>

            <div class="input-div">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" value="${user.password}"/>
            </div>

            <input class="submit-button" type="submit" value="Register">
        </form>
    </div>
</@layout.mainLayout>