# image server
 
 You need NodeJS to run this server

 ## Installation
 1- Edit the file `config.json` with your port and url (this must be accesible to all, so if the outside port it's different of 80 you must provide it also in the url, ej: http://myimageserver.mydomain.com:3555)

 2- Execute `npm install` on the folder you have the files

 3- Execute `node .` to start the server

## Basic Usage

`Get /image_name.image_extension`

Get the /image_name.image_extension and returns it if exist.

`Post /upload`

Upload or post an image to the server. You can use any kind of clients to do this, but must pay 
attention to these:

* Content-Type: multipart/form-data
* Images field `files[]`

Returns a JSON array contains the upload images with it's urls.