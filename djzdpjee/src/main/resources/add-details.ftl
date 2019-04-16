<#import "template.ftl" as layout />

<@layout.mainLayout title="Welcome">
    <div class="registration-form">

        <h3>Edit details</h3>

        <form action="/add-details" method="post" enctype="application/x-www-form-urlencoded">

            <div class="input-div">
                <label for="email">Address</label>
                <input type="text" name="address" id="address"/>
            </div>

            <input class="submit-button" type="submit" value="Edit">
        </form>

    </div>
</@layout.mainLayout>