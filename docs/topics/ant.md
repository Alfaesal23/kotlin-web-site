[//]: # (title: Ant)

> Starting with Kotlin 2.2.0, support for the Ant build system in Kotlin is deprecated.
> We plan to remove Ant support in Kotlin 2.3.0.
> 
> However, if you're interested in becoming an external maintainer for Ant,
> leave a comment in [this YouTrack issue](https://youtrack.jetbrains.com/issue/KT-75875/).
> 
{style="warning"}

## Getting the Ant tasks

Kotlin provides three tasks for Ant:

* `kotlinc`: Kotlin compiler targeting the JVM
* `kotlin2js`: Kotlin compiler targeting JavaScript
* `withKotlin`: Task to compile Kotlin files when using the standard *javac* Ant task

These tasks are defined in the *kotlin-ant.jar* library which is located in the `lib` folder 
in the [Kotlin Compiler](%kotlinLatestUrl%) archive. Ant version 1.8.2+ is required.

## Targeting JVM with Kotlin-only source

When the project consists of exclusively Kotlin source code, the easiest way to compile the project is to use the `kotlinc` task:

```xml
<project name="Ant Task Test" default="build">
    <typedef resource="org/jetbrains/kotlin/ant/antlib.xml" classpath="${kotlin.lib}/kotlin-ant.jar"/>

    <target name="build">
        <kotlinc src="hello.kt" output="hello.jar"/>
    </target>
</project>
```

where `${kotlin.lib}` points to the folder where the Kotlin standalone compiler was unzipped.

## Targeting JVM with Kotlin-only source and multiple roots

If a project consists of multiple source roots, use `src` as elements to define paths:

```xml
<project name="Ant Task Test" default="build">
    <typedef resource="org/jetbrains/kotlin/ant/antlib.xml" classpath="${kotlin.lib}/kotlin-ant.jar"/>

    <target name="build">
        <kotlinc output="hello.jar">
            <src path="root1"/>
            <src path="root2"/>
        </kotlinc>
    </target>
</project>
```

## Targeting JVM with Kotlin and Java source

If a project consists of both Kotlin and Java source code, while it is possible to use `kotlinc`, to avoid repetition of
task parameters, it is recommended to use `withKotlin` task:

```xml
<project name="Ant Task Test" default="build">
    <typedef resource="org/jetbrains/kotlin/ant/antlib.xml" classpath="${kotlin.lib}/kotlin-ant.jar"/>

    <target name="build">
        <delete dir="classes" failonerror="false"/>
        <mkdir dir="classes"/>
        <javac destdir="classes" includeAntRuntime="false" srcdir="src">
            <withKotlin/>
        </javac>
        <jar destfile="hello.jar">
            <fileset dir="classes"/>
        </jar>
    </target>
</project>
```

You can also specify the name of the module being compiled as the `moduleName` attribute:

```xml
<withKotlin moduleName="myModule"/>
```

## Targeting JavaScript with single source folder

```xml
<project name="Ant Task Test" default="build">
    <typedef resource="org/jetbrains/kotlin/ant/antlib.xml" classpath="${kotlin.lib}/kotlin-ant.jar"/>

    <target name="build">
        <kotlin2js src="root1" output="out.js"/>
    </target>
</project>
```

## Targeting JavaScript with Prefix, PostFix and sourcemap options

```xml
<project name="Ant Task Test" default="build">
    <taskdef resource="org/jetbrains/kotlin/ant/antlib.xml" classpath="${kotlin.lib}/kotlin-ant.jar"/>

    <target name="build">
        <kotlin2js src="root1" output="out.js" outputPrefix="prefix" outputPostfix="postfix" sourcemap="true"/>
    </target>
</project>
```

## Targeting JavaScript with single source folder and metaInfo option

The `metaInfo` option is useful, if you want to distribute the result of translation as a Kotlin/JavaScript library.
If `metaInfo` was set to `true`, then during compilation additional JS file with
binary metadata will be created. This file should be distributed together with the
result of translation:

```xml
<project name="Ant Task Test" default="build">
    <typedef resource="org/jetbrains/kotlin/ant/antlib.xml" classpath="${kotlin.lib}/kotlin-ant.jar"/>

    <target name="build">
        <!-- out.meta.js will be created, which contains binary metadata -->
        <kotlin2js src="root1" output="out.js" metaInfo="true"/>
    </target>
</project>
```

## References

Complete list of elements and attributes are listed below:

### Attributes common for kotlinc and kotlin2js

| Name | Description | Required | Default Value |
|------|-------------|----------|---------------|
| `src`  | Kotlin source file or directory to compile | Yes |  |
| `nowarn` | Suppresses all compilation warnings | No | false |
| `noStdlib` | Does not include the Kotlin standard library into the classpath | No | false |
| `failOnError` | Fails the build if errors are detected during the compilation | No | true |

### kotlinc attributes

| Name | Description | Required | Default Value |
|------|-------------|----------|---------------|
| `output`  | Destination directory or .jar file name | Yes |  |
| `classpath`  | Compilation class path | No |  |
| `classpathref`  | Compilation class path reference | No |  |
| `includeRuntime`  | If `output` is a .jar file, whether Kotlin runtime library is included in the jar | No | true  |
| `moduleName` | Name of the module being compiled | No | The name of the target (if specified) or the project |

### kotlin2js attributes

| Name | Description | Required |
|------|-------------|----------|
| `output`  | Destination file | Yes |
| `libraries`  | Paths to Kotlin libraries | No |
| `outputPrefix`  | Prefix to use for generated JavaScript files | No |
| `outputSuffix` | Suffix to use for generated JavaScript files | No |
| `sourcemap`  | Whether sourcemap file should be generated | No |
| `metaInfo`  | Whether metadata file with binary descriptors should be generated | No |
| `main`  | Should compiler generated code call the main function | No |

### Passing raw compiler arguments

To pass custom raw compiler arguments, you can use `<compilerarg>` elements with either `value` or `line` attributes.
This can be done within the `<kotlinc>`, `<kotlin2js>`, and `<withKotlin>` task elements, as follows:

```xml
<kotlinc src="${test.data}/hello.kt" output="${temp}/hello.jar">
    <compilerarg value="-Xno-inline"/>
    <compilerarg line="-Xno-call-assertions -Xno-param-assertions"/>
    <compilerarg value="-Xno-optimize"/>
</kotlinc>
```

The full list of arguments that can be used is shown when you run `kotlinc -help`.