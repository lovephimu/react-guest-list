# Guest List

The guest list stores and shows guests and their individual attending status.

## How to Use

- In order to use the app you need a guest API.
- Enter a guest's name by using the fist and last name inputs.
- With the last name field active hit enter to save to guest to the API-database.
- Change the attending status by clicking the checkbox on the right. The heart symbol will switch to a vibrant red heart.
- Remove a guest entry by clicking the remove button.

## Behind the Scenes

- The React part is split into two components: a list and a guest entry
- On page load the guest entries are fetched and for each guest a guest entry is created
- On change the database is updated and its response (either create, change attending status or delete) used to update React states that control the UI and feed it with guest data
