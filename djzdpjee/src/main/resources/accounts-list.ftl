<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">

    <div class="account">
        <p class="account-element">Email</p>
        <p class="account-element">Name</p>
        <p class="account-element">Surname</p>
    </div>

    <#list users as user>
        <a href="/accounts/${user.id}">
            <div class="account">
                <p class="account-element">${user.email}</p>
                <p class="account-element">${user.name}</p>
                <p class="account-element">${user.surname}</p>
            </div>
        </a>
    <#else>
        <h3>There are no users yet</h3>
    </#list>

</@layout.mainLayout>