const asciidoctor = require('asciidoctor')();
asciidoctor.convertFile("src/doc/doc.adoc", { to_dir:'public', to_file: 'doc.html', standalone: true, safe: 'unsafe'});

