const asciidoctor = require('asciidoctor')();
asciidoctor.convertFile("src/doc/ROOT/doc.adoc", { to_dir:'public/doc', to_file: 'index.html', standalone: true, safe: 'unsafe', mkdirs:true});

