export interface Language {
  aliases: string[]
  dependencies?: string[]
}

export const languages: Language[] = [
  {
    aliases: ["1c"],
  },
  {
    aliases: ["abnf"],
  },
  {
    aliases: ["accesslog"],
  },
  {
    aliases: ["actionscript"],
  },
  {
    aliases: ["ada"],
  },
  {
    aliases: ["angelscript"],
  },
  {
    aliases: ["apache"],
  },
  {
    aliases: ["applescript"],
  },
  {
    aliases: ["arcade"],
  },
  {
    aliases: ["arduino"],
    dependencies: ["cpp"],
  },
  {
    aliases: ["armasm", "arm"],
  },
  {
    aliases: ["asciidoc", "adoc"],
  },
  {
    aliases: ["aspectj"],
  },
  {
    aliases: ["autohotkey", "ahk"],
  },
  {
    aliases: ["autoit"],
  },
  {
    aliases: ["avrasm"],
  },
  {
    aliases: ["awk"],
  },
  {
    aliases: ["axapta"],
  },
  {
    aliases: ["bash", "sh", "zsh"],
  },
  {
    aliases: ["basic"],
  },
  {
    aliases: ["bnf"],
  },
  {
    aliases: ["brainfuck", "bf"],
  },
  {
    aliases: ["cal"],
  },
  {
    aliases: ["capnproto", "capnp"],
  },
  {
    aliases: ["ceylon"],
  },
  {
    aliases: ["clean", "dcl", "icl"],
  },
  {
    aliases: ["clojure", "clj"],
  },
  {
    aliases: ["clojure-repl"],
  },
  {
    aliases: ["cmake", "cmake.in"],
  },
  {
    aliases: ["coffeescript", "coffee", "cson", "iced"],
  },
  {
    aliases: ["coq"],
  },
  {
    aliases: ["cos", "cls"],
  },
  {
    aliases: ["cpp", "c", "c++", "cc", "cxx", "h", "h++", "hh", "hpp", "hxx"],
  },
  {
    aliases: ["crmsh", "crm", "pcmk"],
  },
  {
    aliases: ["crystal", "cr"],
  },
  {
    aliases: ["cs", "c#", "csharp"],
  },
  {
    aliases: ["csp"],
  },
  {
    aliases: ["css"],
  },
  {
    aliases: ["d"],
  },
  {
    aliases: ["dart"],
  },
  {
    aliases: [
      "delphi",
      "dfm",
      "dpr",
      "freepascal",
      "lazarus",
      "lfm",
      "lpr",
      "pas",
      "pascal",
    ],
  },
  {
    aliases: ["diff", "patch"],
  },
  {
    aliases: ["django", "jinja"],
  },
  {
    aliases: ["dns", "bind", "zone"],
  },
  {
    aliases: ["dockerfile", "docker"],
  },
  {
    aliases: ["dos", "bat", "cmd"],
  },
  {
    aliases: ["dsconfig"],
  },
  {
    aliases: ["dts"],
  },
  {
    aliases: ["dust", "dst"],
  },
  {
    aliases: ["ebnf"],
  },
  {
    aliases: ["elixir"],
  },
  {
    aliases: ["elm"],
  },
  {
    aliases: ["erb"],
  },
  {
    aliases: ["erlang", "erl"],
  },
  {
    aliases: ["erlang-repl"],
  },
  {
    aliases: ["excel", "xls", "xlsx"],
  },
  {
    aliases: ["fix"],
  },
  {
    aliases: ["flix"],
  },
  {
    aliases: ["fortran", "f90", "f95"],
  },
  {
    aliases: ["fsharp", "fs"],
  },
  {
    aliases: ["gams", "gms"],
  },
  {
    aliases: ["gauss", "gss"],
  },
  {
    aliases: ["gcode", "nc"],
  },
  {
    aliases: ["gherkin", "feature"],
  },
  {
    aliases: ["glsl"],
  },
  {
    aliases: ["gml"],
  },
  {
    aliases: ["go", "golang"],
  },
  {
    aliases: ["golo"],
  },
  {
    aliases: ["gradle"],
  },
  {
    aliases: ["groovy"],
  },
  {
    aliases: ["haml"],
  },
  {
    aliases: ["handlebars", "hbs", "html.handlebars", "html.hbs"],
  },
  {
    aliases: ["haskell", "hs"],
  },
  {
    aliases: ["haxe", "hx"],
  },
  {
    aliases: ["hsp"],
  },
  {
    aliases: ["htmlbars"],
  },
  {
    aliases: ["http", "https"],
  },
  {
    aliases: ["hy", "hylang"],
  },
  {
    aliases: ["inform7", "i7"],
  },
  {
    aliases: ["ini", "toml"],
  },
  {
    aliases: ["irpf90"],
  },
  {
    aliases: ["isbl"],
  },
  {
    aliases: ["java", "jsp"],
  },
  {
    aliases: ["javascript", "js", "jsx"],
  },
  {
    aliases: ["jboss-cli", "wildfly-cli"],
  },
  {
    aliases: ["json"],
  },
  {
    aliases: ["julia"],
  },
  {
    aliases: ["julia-repl"],
  },
  {
    aliases: ["kotlin", "kt"],
  },
  {
    aliases: ["lasso", "lassoscript", "ls"],
  },
  {
    aliases: ["ldif"],
  },
  {
    aliases: ["leaf"],
  },
  {
    aliases: ["less"],
  },
  {
    aliases: ["lisp"],
  },
  {
    aliases: ["livecodeserver"],
  },
  {
    aliases: ["livescript", "ls"],
  },
  {
    aliases: ["llvm"],
  },
  {
    aliases: ["lsl"],
  },
  {
    aliases: ["lua"],
  },
  {
    aliases: ["makefile", "mak", "mk"],
  },
  {
    aliases: ["markdown", "md", "mkd", "mkdown"],
  },
  {
    aliases: ["mathematica", "mma"],
  },
  {
    aliases: ["matlab"],
  },
  {
    aliases: ["maxima"],
  },
  {
    aliases: ["mel"],
  },
  {
    aliases: ["mercury", "m", "moo"],
  },
  {
    aliases: ["mipsasm", "mips"],
  },
  {
    aliases: ["mizar"],
  },
  {
    aliases: ["mojolicious"],
  },
  {
    aliases: ["monkey"],
  },
  {
    aliases: ["moonscript", "moon"],
  },
  {
    aliases: ["n1ql"],
  },
  {
    aliases: ["nginx", "nginxconf"],
  },
  {
    aliases: ["nimrod", "nim"],
  },
  {
    aliases: ["nix", "nixos"],
  },
  {
    aliases: ["nsis"],
  },
  {
    aliases: ["objectivec", "mm", "obj-c", "objc"],
  },
  {
    aliases: ["ocaml", "ml"],
  },
  {
    aliases: ["openscad", "scad"],
  },
  {
    aliases: ["oxygene"],
  },
  {
    aliases: ["parser3"],
  },
  {
    aliases: ["perl", "pl", "pm"],
  },
  {
    aliases: ["pf", "pf.conf"],
  },
  {
    aliases: ["pgsql", "postgres", "postgresql"],
  },
  {
    aliases: ["php", "php3", "php4", "php5", "php6", "php7"],
  },
  {
    aliases: ["plaintext"],
  },
  {
    aliases: ["pony"],
  },
  {
    aliases: ["powershell", "ps"],
  },
  {
    aliases: ["processing"],
  },
  {
    aliases: ["profile"],
  },
  {
    aliases: ["prolog"],
  },
  {
    aliases: ["properties"],
  },
  {
    aliases: ["protobuf"],
  },
  {
    aliases: ["puppet", "pp"],
  },
  {
    aliases: ["purebasic", "pb", "pbi"],
  },
  {
    aliases: ["python", "gyp", "ipython", "py"],
  },
  {
    aliases: ["q", "k", "kdb"],
  },
  {
    aliases: ["qml", "qt"],
  },
  {
    aliases: ["r"],
  },
  {
    aliases: ["reasonml", "re"],
  },
  {
    aliases: ["rib"],
  },
  {
    aliases: ["roboconf", "graph", "instances"],
  },
  {
    aliases: ["routeros", "mikrotik"],
  },
  {
    aliases: ["rsl"],
  },
  {
    aliases: ["ruby", "gemspec", "irb", "podspec", "rb", "thor"],
  },
  {
    aliases: ["ruleslanguage"],
  },
  {
    aliases: ["rust", "rs"],
  },
  {
    aliases: ["sas"],
  },
  {
    aliases: ["scala"],
  },
  {
    aliases: ["scheme"],
  },
  {
    aliases: ["scilab", "sci"],
  },
  {
    aliases: ["scss"],
  },
  {
    aliases: ["shell", "console"],
  },
  {
    aliases: ["smali"],
  },
  {
    aliases: ["smalltalk", "st"],
  },
  {
    aliases: ["sml", "ml"],
  },
  {
    aliases: ["sqf"],
    dependencies: ["cpp"],
  },
  {
    aliases: ["sql"],
  },
  {
    aliases: ["stan"],
  },
  {
    aliases: ["stata", "ado", "do"],
  },
  {
    aliases: ["step21", "p21", "step", "stp"],
  },
  {
    aliases: ["stylus", "styl"],
  },
  {
    aliases: ["subunit"],
  },
  {
    aliases: ["swift"],
  },
  {
    aliases: ["taggerscript"],
  },
  {
    aliases: ["tap"],
  },
  {
    aliases: ["tcl", "tk"],
  },
  {
    aliases: ["tex"],
  },
  {
    aliases: ["thrift"],
  },
  {
    aliases: ["tp"],
  },
  {
    aliases: ["twig", "craftcms"],
  },
  {
    aliases: ["typescript", "ts"],
  },
  {
    aliases: ["vala"],
  },
  {
    aliases: ["vbnet", "vb"],
  },
  {
    aliases: ["vbscript", "vbs"],
  },
  {
    aliases: ["vbscript-html"],
  },
  {
    aliases: ["verilog", "sv", "svh", "v"],
  },
  {
    aliases: ["vhdl"],
  },
  {
    aliases: ["vim"],
  },
  {
    aliases: ["x86asm"],
  },
  {
    aliases: ["xl", "tao"],
  },
  {
    aliases: [
      "xml",
      "atom",
      "html",
      "plist",
      "rss",
      "xhtml",
      "xjb",
      "xsd",
      "xsl",
    ],
  },
  {
    aliases: ["xquery", "xpath", "xq"],
  },
  {
    aliases: ["yaml", "yml"],
  },
  {
    aliases: ["zephir", "zep"],
  },
]
