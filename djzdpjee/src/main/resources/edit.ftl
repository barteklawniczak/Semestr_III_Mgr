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

            <h3 class="addresses">Addresses</h3>

            <#list details as detail>
                <a href="/accounts/${loggedUser.id}/details/${detail.id}" class="input-div">
                    <p class="account-element">${detail.address}</p>
                </a>
            <#else>
                <h3>There are no addresses yet</h3>
            </#list>

            <input class="submit-button" type="submit" value="Edit">
            <br>
            <a href="/add-details">Add new details</a>
        </form>
    </div>
</@layout.mainLayout>