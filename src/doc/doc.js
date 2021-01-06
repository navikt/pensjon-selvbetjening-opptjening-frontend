const asciidoctor = require('asciidoctor')();
asciidoctor.convertFile("src/doc/doc.adoc", { to_dir:'public/doc', to_file: 'index.html', standalone: true, safe: 'unsafe', mkdirs:true});

