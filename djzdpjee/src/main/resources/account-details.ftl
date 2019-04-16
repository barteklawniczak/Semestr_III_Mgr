<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">

    <div class="registration-form">

        <h3>Account details</h3>

        <div class="input-div">
            <label for="email">Email</label>
            <div class="user-detail">${user.email}</div>
        </div>

        <div class="input-div">
            <label for="name">Name</label>
            <div class="user-detail">${user.name}</div>
        </div>

        <div class="input-div">
            <label for="surname">Surname</label>
            <div class="user-detail">${user.surname}</div>
        </div>


        <h3 class="addresses">Addresses</h3>

        <#list details as detail>
            <div class="input-div">
                <p class="account-element">${detail.address}</p>
            </div>
        <#else>
            <h3>There are no addresses yet</h3>
        </#list>


    </div>

</@layout.mainLayout>