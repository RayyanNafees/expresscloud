const Layout = require("./layout");

<Layout>
	<h1>Uploader</h1>
	<form action="/upload" method="post" enctype="multipart/form-data">
		<input type="file" name="file" />
		<button type="submit">Upload</button>
	</form>
	<main>
		<h2>Files</h2>
		{fileUrl && <img src={fileUrl} alt={filealt} />}
	</main>
</Layout>;
