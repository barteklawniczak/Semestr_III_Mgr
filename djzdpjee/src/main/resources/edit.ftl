<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">
    <div class="registration-form">
    <#if error??>
        <p style="color:red;">${error}</p>
    </#if>

    <h3>Edit your account</h3>

    <form action="/edit" method="post" enctype="application/x-www-form-urlencoded">

        <input hidden name="id" id="id" value="${loggedUser.id}"/>

        <div class="input-div">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="${loggedUser.email}"/>
        </div>

        <div class="input-div">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="${loggedUser.name}"/>
        </div>

        <div class="input-div">
            <label for="surname">Surname</label>
            <input type="text" name=surname" id="surname" value="${loggedUser.surname}"/>
        </div>

        <input class="submit-button" type="submit" value="Edit">
    </form>
</@layout.mainLayout>