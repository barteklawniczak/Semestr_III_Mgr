<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">
    <div class="registration-form">

        <h3>Edit details</h3>

        <form action="/accounts/{id}/details/{detailsId}" method="post" enctype="application/x-www-form-urlencoded">

            <input hidden name="id" id="id" value="${detail.id}"/>

            <div class="input-div">
                <label for="email">Address</label>
                <input type="text" name="address" id="address" value="${detail.address}"/>
            </div>

            <input class="submit-button" type="submit" value="Edit">
        </form>

    </div>
</@layout.mainLayout>