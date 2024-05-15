extern crate glsl;
extern crate serde;
extern crate serde_json;
extern crate wasm_bindgen;

use glsl::parser::Parse as _;
use glsl::parser::Parse as _;
use glsl::syntax::*;
use glsl::syntax::TranslationUnit;
use serde::Serialize;
use wasm_bindgen::JsValue;
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(Serialize)]
struct ShaderStageJson {
    declarations: Vec<ExternalDeclarationJson>,
}

#[derive(Serialize)]
#[serde(untagged)]
enum ExternalDeclarationJson {
    Preprocessor(PreprocessorJson),
    FunctionDefinition(FunctionDefinitionJson),
    Declaration(DeclarationJson),
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum PreprocessorJson {
    Define {
        #[serde(flatten)]
        define: PreprocessorDefineJson,
    },
    Else,
    ElIf {
        condition: String,
    },
    EndIf,
    Error {
        message: String,
    },
    If {
        condition: String,
    },
    IfDef {
        ident: String,
    },
    IfNDef {
        ident: String,
    },
    Include {
        path: PathJson,
    },
    Line {
        line: u32,
        source_string_number: Option<u32>,
    },
    Pragma {
        command: String,
    },
    Undef {
        name: String,
    },
    Version {
        version: u16,
        profile: Option<PreprocessorVersionProfileJson>,
    },
    Extension {
        name: PreprocessorExtensionNameJson,
        behavior: Option<PreprocessorExtensionBehaviorJson>,
    },
}

#[derive(Serialize)]
#[serde(untagged)]
enum PreprocessorDefineJson {
    ObjectLike {
        ident: String,
        value: String,
    },
    FunctionLike {
        ident: String,
        args: Vec<String>,
        value: String,
    },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum PathJson {
    Absolute {
        path: String,
    },
    Relative {
        path: String,
    },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum PreprocessorVersionProfileJson {
    Core,
    Compatibility,
    ES,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum PreprocessorExtensionNameJson {
    All,
    Specific { name: String },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum PreprocessorExtensionBehaviorJson {
    Require,
    Enable,
    Warn,
    Disable,
}

#[derive(Serialize)]
struct FunctionDefinitionJson {
    prototype: FunctionPrototypeJson,
    statement: CompoundStatementJson,
}

#[derive(Serialize)]
struct FunctionPrototypeJson {
    ty: FullySpecifiedTypeJson,
    name: String,
    parameters: Vec<FunctionParameterDeclarationJson>,
}

#[derive(Serialize)]
struct FullySpecifiedTypeJson {
    qualifier: Option<TypeQualifierJson>,
    ty: TypeSpecifierJson,
}

#[derive(Serialize)]
struct TypeQualifierJson {
    qualifiers: Vec<TypeQualifierSpecJson>,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum TypeQualifierSpecJson {
    Storage {
        #[serde(flatten)]
        storage: StorageQualifierJson,
    },
    Layout {
        ids: Vec<LayoutQualifierSpecJson>,
    },
    Precision {
        precision: PrecisionQualifierJson,
    },
    Interpolation {
        interpolation: InterpolationQualifierJson,
    },
    Invariant,
    Precise,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum StorageQualifierJson {
    Const,
    InOut,
    In,
    Out,
    Centroid,
    Patch,
    Sample,
    Uniform,
    Attribute,
    Varying,
    Buffer,
    Shared,
    Coherent,
    Volatile,
    Restrict,
    ReadOnly,
    WriteOnly,
    Subroutine { types: Vec<String> },
}

#[derive(Serialize)]
#[serde(untagged)]
enum LayoutQualifierSpecJson {
    Identifier {
        ident: String,
        expr: Option<Box<ExprJson>>,
    },
    Shared,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum PrecisionQualifierJson {
    High,
    Medium,
    Low,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum InterpolationQualifierJson {
    Smooth,
    Flat,
    NoPerspective,
}

#[derive(Serialize)]
struct TypeSpecifierJson {
    ty: TypeSpecifierNonArrayJson,
    array_specifier: Option<ArraySpecifierJson>,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum TypeSpecifierNonArrayJson {
    Void,
    Bool,
    Int,
    UInt,
    Float,
    Double,
    Vec2,
    Vec3,
    Vec4,
    DVec2,
    DVec3,
    DVec4,
    BVec2,
    BVec3,
    BVec4,
    IVec2,
    IVec3,
    IVec4,
    UVec2,
    UVec3,
    UVec4,
    Mat2,
    Mat3,
    Mat4,
    Mat23,
    Mat24,
    Mat32,
    Mat34,
    Mat42,
    Mat43,
    DMat2,
    DMat3,
    DMat4,
    DMat23,
    DMat24,
    DMat32,
    DMat34,
    DMat42,
    DMat43,
    Sampler1D,
    Image1D,
    Sampler2D,
    Image2D,
    Sampler3D,
    Image3D,
    SamplerCube,
    ImageCube,
    Sampler2DRect,
    Image2DRect,
    Sampler1DArray,
    Image1DArray,
    Sampler2DArray,
    Image2DArray,
    SamplerBuffer,
    ImageBuffer,
    Sampler2DMS,
    Image2DMS,
    Sampler2DMSArray,
    Image2DMSArray,
    SamplerCubeArray,
    ImageCubeArray,
    Sampler1DShadow,
    Sampler2DShadow,
    Sampler2DRectShadow,
    Sampler1DArrayShadow,
    Sampler2DArrayShadow,
    SamplerCubeShadow,
    SamplerCubeArrayShadow,
    ISampler1D,
    IImage1D,
    ISampler2D,
    IImage2D,
    ISampler3D,
    IImage3D,
    ISamplerCube,
    IImageCube,
    ISampler2DRect,
    IImage2DRect,
    ISampler1DArray,
    IImage1DArray,
    ISampler2DArray,
    IImage2DArray,
    ISamplerBuffer,
    IImageBuffer,
    ISampler2DMS,
    IImage2DMS,
    ISampler2DMSArray,
    IImage2DMSArray,
    ISamplerCubeArray,
    IImageCubeArray,
    AtomicUInt,
    USampler1D,
    UImage1D,
    USampler2D,
    UImage2D,
    USampler3D,
    UImage3D,
    USamplerCube,
    UImageCube,
    USampler2DRect,
    UImage2DRect,
    USampler1DArray,
    UImage1DArray,
    USampler2DArray,
    UImage2DArray,
    USamplerBuffer,
    UImageBuffer,
    USampler2DMS,
    UImage2DMS,
    USampler2DMSArray,
    UImage2DMSArray,
    USamplerCubeArray,
    UImageCubeArray,
    Struct {
        spec: StructSpecifierJson,
    },
    TypeName {
        name: String,
    },
}

#[derive(Serialize)]
struct StructSpecifierJson {
    name: Option<String>,
    fields: Vec<StructFieldSpecifierJson>,
}

#[derive(Serialize)]
struct StructFieldSpecifierJson {
    qualifier: Option<TypeQualifierJson>,
    ty: TypeSpecifierJson,
    identifiers: Vec<ArrayedIdentifierJson>,
}

#[derive(Serialize)]
struct ArrayedIdentifierJson {
    ident: String,
    array_spec: Option<ArraySpecifierJson>,
}

#[derive(Serialize)]
struct ArraySpecifierJson {
    dimensions: Vec<ArraySpecifierDimensionJson>,
}

#[derive(Serialize)]
#[serde(untagged)]
enum ArraySpecifierDimensionJson {
    Unsized,
    ExplicitlySized { expr: Box<ExprJson> },
}

#[derive(Serialize)]
#[serde(untagged)]
enum FunctionParameterDeclarationJson {
    Named {
        qualifier: Option<TypeQualifierJson>,
        declarator: FunctionParameterDeclaratorJson,
    },
    Unnamed {
        qualifier: Option<TypeQualifierJson>,
        ty: TypeSpecifierJson,
    },
}

#[derive(Serialize)]
struct FunctionParameterDeclaratorJson {
    ty: TypeSpecifierJson,
    ident: ArrayedIdentifierJson,
}

#[derive(Serialize)]
struct CompoundStatementJson {
    statement_list: Vec<StatementJson>,
}

#[derive(Serialize)]
#[serde(untagged)]
enum StatementJson {
    Compound {
        statement: Box<CompoundStatementJson>,
    },
    Simple {
        statement: Box<SimpleStatementJson>,
    },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum SimpleStatementJson {
    Declaration {
        declaration: DeclarationJson,
    },
    Expression {
        expression: Option<ExprJson>,
    },
    Selection {
        selection: SelectionStatementJson,
    },
    Switch {
        switch: SwitchStatementJson,
    },
    CaseLabel {
        #[serde(flatten)]
        case_label: CaseLabelJson,
    },
    Iteration {
        #[serde(flatten)]
        iteration: IterationStatementJson,
    },
    Jump {
        #[serde(flatten)]
        jump: JumpStatementJson,
    },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum DeclarationJson {
    FunctionPrototype {
        prototype: FunctionPrototypeJson,
    },
    InitDeclaratorList {
        head: SingleDeclarationJson,
        tail: Vec<SingleDeclarationNoTypeJson>,
    },
    Precision {
        precision: PrecisionQualifierJson,
        ty: TypeSpecifierJson,
    },
    Block {
        qualifier: TypeQualifierJson,
        name: String,
        fields: Vec<StructFieldSpecifierJson>,
        identifier: Option<ArrayedIdentifierJson>,
    },
    Global {
        qualifier: TypeQualifierJson,
        identifiers: Vec<String>,
    },
}

#[derive(Serialize)]
struct SingleDeclarationJson {
    ty: FullySpecifiedTypeJson,
    name: Option<String>,
    array_specifier: Option<ArraySpecifierJson>,
    initializer: Option<InitializerJson>,
}

#[derive(Serialize)]
struct SingleDeclarationNoTypeJson {
    ident: ArrayedIdentifierJson,
    initializer: Option<InitializerJson>,
}

#[derive(Serialize)]
#[serde(untagged)]
enum InitializerJson {
    Simple { expr: Box<ExprJson> },
    List { initializers: Vec<InitializerJson> },
}

#[derive(Serialize)]
struct SelectionStatementJson {
    cond: Box<ExprJson>,
    #[serde(flatten)]
    rest: SelectionRestStatementJson,
}

#[derive(Serialize)]
#[serde(untagged)]
enum SelectionRestStatementJson {
    Statement { statement: Box<StatementJson> },
    Else {
        statement: Box<StatementJson>,
        else_statement: Box<StatementJson>,
    },
}

#[derive(Serialize)]
struct SwitchStatementJson {
    head: Box<ExprJson>,
    body: Vec<StatementJson>,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum CaseLabelJson {
    Case { expr: Box<ExprJson> },
    Def,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum IterationStatementJson {
    While {
        #[serde(flatten)]
        condition: ConditionJson,
        statement: Box<StatementJson>,
    },
    DoWhile {
        statement: Box<StatementJson>,
        cond: Box<ExprJson>,
    },
    For {
        #[serde(flatten)]
        init: ForInitStatementJson,
        #[serde(flatten)]
        rest: ForRestStatementJson,
        statement: Box<StatementJson>,
    },
}

#[derive(Serialize)]
#[serde(untagged)]
enum ConditionJson {
    Expr { expr: Box<ExprJson> },
    Assignment {
        ty: FullySpecifiedTypeJson,
        ident: String,
        initializer: InitializerJson,
    },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum ForInitStatementJson {
    Expression { expr: Option<ExprJson> },
    Declaration { declaration: Box<DeclarationJson> },
}

#[derive(Serialize)]
struct ForRestStatementJson {
    condition: Option<ConditionJson>,
    post_expr: Option<Box<ExprJson>>,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum JumpStatementJson {
    Continue,
    Break,
    Return { expr: Option<Box<ExprJson>> },
    Discard,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum ExprJson {
    Variable { ident: String },
    IntConst { value: i32 },
    UIntConst { value: u32 },
    BoolConst { value: bool },
    FloatConst { value: f32 },
    DoubleConst { value: f64 },
    Unary {
        op: UnaryOpJson,
        expr: Box<ExprJson>,
    },
    Binary {
        op: BinaryOpJson,
        left: Box<ExprJson>,
        right: Box<ExprJson>,
    },
    Ternary {
        cond: Box<ExprJson>,
        left: Box<ExprJson>,
        right: Box<ExprJson>,
    },
    Assignment {
        left: Box<ExprJson>,
        op: AssignmentOpJson,
        right: Box<ExprJson>,
    },
    Bracket {
        expr: Box<ExprJson>,
        array_spec: ArraySpecifierJson,
    },
    FunCall {
        #[serde(flatten)]
        fun_ident: FunIdentifierJson,
        args: Vec<ExprJson>,
    },
    Dot {
        expr: Box<ExprJson>,
        ident: String,
    },
    PostInc { expr: Box<ExprJson> },
    PostDec { expr: Box<ExprJson> },
    Comma {
        left: Box<ExprJson>,
        right: Box<ExprJson>,
    },
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum UnaryOpJson {
    Inc,
    Dec,
    Add,
    Minus,
    Not,
    Complement,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum BinaryOpJson {
    Or,
    Xor,
    And,
    BitOr,
    BitXor,
    BitAnd,
    Equal,
    NonEqual,
    LT,
    GT,
    LTE,
    GTE,
    LShift,
    RShift,
    Add,
    Sub,
    Mult,
    Div,
    Mod,
}

#[derive(Serialize)]
#[serde(tag = "type")]
enum AssignmentOpJson {
    Equal,
    Mult,
    Div,
    Mod,
    Add,
    Sub,
    LShift,
    RShift,
    And,
    Xor,
    Or,
}

#[derive(Serialize)]
#[serde(untagged)]
enum FunIdentifierJson {
    Identifier { ident: String },
    Expr { expr: Box<ExprJson> },
}

impl From<ShaderStage> for ShaderStageJson {
    fn from(stage: ShaderStage) -> Self {
        ShaderStageJson {
            declarations: stage
                .0
                .into_iter()
                .map(|decl| match decl {
                    ExternalDeclaration::Preprocessor(p) => {
                        ExternalDeclarationJson::Preprocessor(p.into())
                    }
                    ExternalDeclaration::FunctionDefinition(f) => {
                        ExternalDeclarationJson::FunctionDefinition(f.into())
                    }
                    ExternalDeclaration::Declaration(d) => {
                        ExternalDeclarationJson::Declaration(d.into())
                    }
                })
                .collect(),
        }
    }
}

impl From<Preprocessor> for PreprocessorJson {
    fn from(preprocessor: Preprocessor) -> Self {
        match preprocessor {
            Preprocessor::Define(define) => PreprocessorJson::Define {
                define: define.into(),
            },
            Preprocessor::Else => PreprocessorJson::Else,
            Preprocessor::ElIf(elif) => PreprocessorJson::ElIf {
                condition: elif.condition,
            },
            Preprocessor::EndIf => PreprocessorJson::EndIf,
            Preprocessor::Error(error) => PreprocessorJson::Error {
                message: error.message,
            },
            Preprocessor::If(if_stmt) => PreprocessorJson::If {
                condition: if_stmt.condition,
            },
            Preprocessor::IfDef(ifdef) => PreprocessorJson::IfDef {
                ident: ifdef.ident.0,
            },
            Preprocessor::IfNDef(ifndef) => PreprocessorJson::IfNDef {
                ident: ifndef.ident.0,
            },
            Preprocessor::Include(include) => PreprocessorJson::Include {
                path: include.path.into(),
            },
            Preprocessor::Line(line) => PreprocessorJson::Line {
                line: line.line,
                source_string_number: line.source_string_number,
            },
            Preprocessor::Pragma(pragma) => PreprocessorJson::Pragma {
                command: pragma.command,
            },
            Preprocessor::Undef(undef) => PreprocessorJson::Undef {
                name: undef.name.0,
            },
            Preprocessor::Version(version) => PreprocessorJson::Version {
                version: version.version,
                profile: version.profile.map(|p| p.into()),
            },
            Preprocessor::Extension(extension) => PreprocessorJson::Extension {
                name: extension.name.into(),
                behavior: extension.behavior.map(|b| b.into()),
            },
        }
    }
}

impl From<PreprocessorDefine> for PreprocessorDefineJson {
    fn from(define: PreprocessorDefine) -> Self {
        match define {
            PreprocessorDefine::ObjectLike { ident, value } => {
                PreprocessorDefineJson::ObjectLike {
                    ident: ident.0,
                    value,
                }
            }
            PreprocessorDefine::FunctionLike { ident, args, value } => {
                PreprocessorDefineJson::FunctionLike {
                    ident: ident.0,
                    args: args.into_iter().map(|a| a.0).collect(),
                    value,
                }
            }
        }
    }
}

impl From<Path> for PathJson {
    fn from(path: Path) -> Self {
        match path {
            Path::Absolute(path) => PathJson::Absolute { path },
            Path::Relative(path) => PathJson::Relative { path },
        }
    }
}

impl From<PreprocessorVersionProfile> for PreprocessorVersionProfileJson {
    fn from(profile: PreprocessorVersionProfile) -> Self {
        match profile {
            PreprocessorVersionProfile::Core => PreprocessorVersionProfileJson::Core,
            PreprocessorVersionProfile::Compatibility => {
                PreprocessorVersionProfileJson::Compatibility
            }
            PreprocessorVersionProfile::ES => PreprocessorVersionProfileJson::ES,
        }
    }
}

impl From<PreprocessorExtensionName> for PreprocessorExtensionNameJson {
    fn from(name: PreprocessorExtensionName) -> Self {
        match name {
            PreprocessorExtensionName::All => PreprocessorExtensionNameJson::All,
            PreprocessorExtensionName::Specific(name) => {
                PreprocessorExtensionNameJson::Specific { name }
            }
        }
    }
}

impl From<PreprocessorExtensionBehavior> for PreprocessorExtensionBehaviorJson {
    fn from(behavior: PreprocessorExtensionBehavior) -> Self {
        match behavior {
            PreprocessorExtensionBehavior::Require => {
                PreprocessorExtensionBehaviorJson::Require
            }
            PreprocessorExtensionBehavior::Enable => PreprocessorExtensionBehaviorJson::Enable,
            PreprocessorExtensionBehavior::Warn => PreprocessorExtensionBehaviorJson::Warn,
            PreprocessorExtensionBehavior::Disable => {
                PreprocessorExtensionBehaviorJson::Disable
            }
        }
    }
}

impl From<FunctionDefinition> for FunctionDefinitionJson {
    fn from(def: FunctionDefinition) -> Self {
        FunctionDefinitionJson {
            prototype: def.prototype.into(),
            statement: def.statement.into(),
        }
    }
}

impl From<FunctionPrototype> for FunctionPrototypeJson {
    fn from(prototype: FunctionPrototype) -> Self {
        FunctionPrototypeJson {
            ty: prototype.ty.into(),
            name: prototype.name.0,
            parameters: prototype
                .parameters
                .into_iter()
                .map(|p| p.into())
                .collect(),
        }
    }
}

impl From<FullySpecifiedType> for FullySpecifiedTypeJson {
    fn from(ty: FullySpecifiedType) -> Self {
        FullySpecifiedTypeJson {
            qualifier: ty.qualifier.map(|q| q.into()),
            ty: ty.ty.into(),
        }
    }
}

impl From<TypeQualifier> for TypeQualifierJson {
    fn from(qualifier: TypeQualifier) -> Self {
        TypeQualifierJson {
            qualifiers: qualifier
                .qualifiers
                .into_iter()
                .map(|q| q.into())
                .collect(),
        }
    }
}

impl From<TypeQualifierSpec> for TypeQualifierSpecJson {
    fn from(spec: TypeQualifierSpec) -> Self {
        match spec {
            TypeQualifierSpec::Storage(storage) => TypeQualifierSpecJson::Storage {
                storage: storage.into(),
            },
            TypeQualifierSpec::Layout(layout) => TypeQualifierSpecJson::Layout {
                ids: layout.ids.into_iter().map(|id| id.into()).collect(),
            },
            TypeQualifierSpec::Precision(precision) => TypeQualifierSpecJson::Precision {
                precision: precision.into(),
            },
            TypeQualifierSpec::Interpolation(interpolation) => {
                TypeQualifierSpecJson::Interpolation {
                    interpolation: interpolation.into(),
                }
            }
            TypeQualifierSpec::Invariant => TypeQualifierSpecJson::Invariant,
            TypeQualifierSpec::Precise => TypeQualifierSpecJson::Precise,
        }
    }
}

impl From<StorageQualifier> for StorageQualifierJson {
    fn from(qualifier: StorageQualifier) -> Self {
        match qualifier {
            StorageQualifier::Const => StorageQualifierJson::Const,
            StorageQualifier::InOut => StorageQualifierJson::InOut,
            StorageQualifier::In => StorageQualifierJson::In,
            StorageQualifier::Out => StorageQualifierJson::Out,
            StorageQualifier::Centroid => StorageQualifierJson::Centroid,
            StorageQualifier::Patch => StorageQualifierJson::Patch,
            StorageQualifier::Sample => StorageQualifierJson::Sample,
            StorageQualifier::Uniform => StorageQualifierJson::Uniform,
            StorageQualifier::Attribute => StorageQualifierJson::Attribute,
            StorageQualifier::Varying => StorageQualifierJson::Varying,
            StorageQualifier::Buffer => StorageQualifierJson::Buffer,
            StorageQualifier::Shared => StorageQualifierJson::Shared,
            StorageQualifier::Coherent => StorageQualifierJson::Coherent,
            StorageQualifier::Volatile => StorageQualifierJson::Volatile,
            StorageQualifier::Restrict => StorageQualifierJson::Restrict,
            StorageQualifier::ReadOnly => StorageQualifierJson::ReadOnly,
            StorageQualifier::WriteOnly => StorageQualifierJson::WriteOnly,
            StorageQualifier::Subroutine(types) => StorageQualifierJson::Subroutine {
                types: types.into_iter().map(|t| t.0).collect(),
            },
        }
    }
}

impl From<LayoutQualifierSpec> for LayoutQualifierSpecJson {
    fn from(spec: LayoutQualifierSpec) -> Self {
        match spec {
            LayoutQualifierSpec::Identifier(ident, expr) => {
                LayoutQualifierSpecJson::Identifier {
                    ident: ident.0,
                    expr: expr.map(|e| Box::new((*e).into())),
                }
            }
            LayoutQualifierSpec::Shared => LayoutQualifierSpecJson::Shared,
        }
    }
}

impl From<PrecisionQualifier> for PrecisionQualifierJson {
    fn from(qualifier: PrecisionQualifier) -> Self {
        match qualifier {
            PrecisionQualifier::High => PrecisionQualifierJson::High,
            PrecisionQualifier::Medium => PrecisionQualifierJson::Medium,
            PrecisionQualifier::Low => PrecisionQualifierJson::Low,
        }
    }
}

impl From<InterpolationQualifier> for InterpolationQualifierJson {
    fn from(qualifier: InterpolationQualifier) -> Self {
        match qualifier {
            InterpolationQualifier::Smooth => InterpolationQualifierJson::Smooth,
            InterpolationQualifier::Flat => InterpolationQualifierJson::Flat,
            InterpolationQualifier::NoPerspective => InterpolationQualifierJson::NoPerspective,
        }
    }
}

impl From<TypeSpecifier> for TypeSpecifierJson {
    fn from(spec: TypeSpecifier) -> Self {
        TypeSpecifierJson {
            ty: spec.ty.into(),
            array_specifier: spec.array_specifier.map(|s| s.into()),
        }
    }
}

impl From<TypeSpecifierNonArray> for TypeSpecifierNonArrayJson {
    fn from(ty: TypeSpecifierNonArray) -> Self {
        match ty {
            TypeSpecifierNonArray::Void => TypeSpecifierNonArrayJson::Void,
            TypeSpecifierNonArray::Bool => TypeSpecifierNonArrayJson::Bool,
            TypeSpecifierNonArray::Int => TypeSpecifierNonArrayJson::Int,
            TypeSpecifierNonArray::UInt => TypeSpecifierNonArrayJson::UInt,
            TypeSpecifierNonArray::Float => TypeSpecifierNonArrayJson::Float,
            TypeSpecifierNonArray::Double => TypeSpecifierNonArrayJson::Double,
            TypeSpecifierNonArray::Vec2 => TypeSpecifierNonArrayJson::Vec2,
            TypeSpecifierNonArray::Vec3 => TypeSpecifierNonArrayJson::Vec3,
            TypeSpecifierNonArray::Vec4 => TypeSpecifierNonArrayJson::Vec4,
            TypeSpecifierNonArray::DVec2 => TypeSpecifierNonArrayJson::DVec2,
            TypeSpecifierNonArray::DVec3 => TypeSpecifierNonArrayJson::DVec3,
            TypeSpecifierNonArray::DVec4 => TypeSpecifierNonArrayJson::DVec4,
            TypeSpecifierNonArray::BVec2 => TypeSpecifierNonArrayJson::BVec2,
            TypeSpecifierNonArray::BVec3 => TypeSpecifierNonArrayJson::BVec3,
            TypeSpecifierNonArray::BVec4 => TypeSpecifierNonArrayJson::BVec4,
            TypeSpecifierNonArray::IVec2 => TypeSpecifierNonArrayJson::IVec2,
            TypeSpecifierNonArray::IVec3 => TypeSpecifierNonArrayJson::IVec3,
            TypeSpecifierNonArray::IVec4 => TypeSpecifierNonArrayJson::IVec4,
            TypeSpecifierNonArray::UVec2 => TypeSpecifierNonArrayJson::UVec2,
            TypeSpecifierNonArray::UVec3 => TypeSpecifierNonArrayJson::UVec3,
            TypeSpecifierNonArray::UVec4 => TypeSpecifierNonArrayJson::UVec4,
            TypeSpecifierNonArray::Mat2 => TypeSpecifierNonArrayJson::Mat2,
            TypeSpecifierNonArray::Mat3 => TypeSpecifierNonArrayJson::Mat3,
            TypeSpecifierNonArray::Mat4 => TypeSpecifierNonArrayJson::Mat4,
            TypeSpecifierNonArray::Mat23 => TypeSpecifierNonArrayJson::Mat23,
            TypeSpecifierNonArray::Mat24 => TypeSpecifierNonArrayJson::Mat24,
            TypeSpecifierNonArray::Mat32 => TypeSpecifierNonArrayJson::Mat32,
            TypeSpecifierNonArray::Mat34 => TypeSpecifierNonArrayJson::Mat34,
            TypeSpecifierNonArray::Mat42 => TypeSpecifierNonArrayJson::Mat42,
            TypeSpecifierNonArray::Mat43 => TypeSpecifierNonArrayJson::Mat43,
            TypeSpecifierNonArray::DMat2 => TypeSpecifierNonArrayJson::DMat2,
            TypeSpecifierNonArray::DMat3 => TypeSpecifierNonArrayJson::DMat3,
            TypeSpecifierNonArray::DMat4 => TypeSpecifierNonArrayJson::DMat4,
            TypeSpecifierNonArray::DMat23 => TypeSpecifierNonArrayJson::DMat23,
            TypeSpecifierNonArray::DMat24 => TypeSpecifierNonArrayJson::DMat24,
            TypeSpecifierNonArray::DMat32 => TypeSpecifierNonArrayJson::DMat32,
            TypeSpecifierNonArray::DMat34 => TypeSpecifierNonArrayJson::DMat34,
            TypeSpecifierNonArray::DMat42 => TypeSpecifierNonArrayJson::DMat42,
            TypeSpecifierNonArray::DMat43 => TypeSpecifierNonArrayJson::DMat43,
            TypeSpecifierNonArray::Sampler1D => TypeSpecifierNonArrayJson::Sampler1D,
            TypeSpecifierNonArray::Image1D => TypeSpecifierNonArrayJson::Image1D,
            TypeSpecifierNonArray::Sampler2D => TypeSpecifierNonArrayJson::Sampler2D,
            TypeSpecifierNonArray::Image2D => TypeSpecifierNonArrayJson::Image2D,
            TypeSpecifierNonArray::Sampler3D => TypeSpecifierNonArrayJson::Sampler3D,
            TypeSpecifierNonArray::Image3D => TypeSpecifierNonArrayJson::Image3D,
            TypeSpecifierNonArray::SamplerCube => TypeSpecifierNonArrayJson::SamplerCube,
            TypeSpecifierNonArray::ImageCube => TypeSpecifierNonArrayJson::ImageCube,
            TypeSpecifierNonArray::Sampler2DRect => TypeSpecifierNonArrayJson::Sampler2DRect,
            TypeSpecifierNonArray::Image2DRect => TypeSpecifierNonArrayJson::Image2DRect,
            TypeSpecifierNonArray::Sampler1DArray => TypeSpecifierNonArrayJson::Sampler1DArray,
            TypeSpecifierNonArray::Image1DArray => TypeSpecifierNonArrayJson::Image1DArray,
            TypeSpecifierNonArray::Sampler2DArray => TypeSpecifierNonArrayJson::Sampler2DArray,
            TypeSpecifierNonArray::Image2DArray => TypeSpecifierNonArrayJson::Image2DArray,
            TypeSpecifierNonArray::SamplerBuffer => TypeSpecifierNonArrayJson::SamplerBuffer,
            TypeSpecifierNonArray::ImageBuffer => TypeSpecifierNonArrayJson::ImageBuffer,
            TypeSpecifierNonArray::Sampler2DMS => TypeSpecifierNonArrayJson::Sampler2DMS,
            TypeSpecifierNonArray::Image2DMS => TypeSpecifierNonArrayJson::Image2DMS,
            TypeSpecifierNonArray::Sampler2DMSArray => {
                TypeSpecifierNonArrayJson::Sampler2DMSArray
            }
            TypeSpecifierNonArray::Image2DMSArray => {
                TypeSpecifierNonArrayJson::Image2DMSArray
            }
            TypeSpecifierNonArray::SamplerCubeArray => {
                TypeSpecifierNonArrayJson::SamplerCubeArray
            }
            TypeSpecifierNonArray::ImageCubeArray => TypeSpecifierNonArrayJson::ImageCubeArray,
            TypeSpecifierNonArray::Sampler1DShadow => TypeSpecifierNonArrayJson::Sampler1DShadow,
            TypeSpecifierNonArray::Sampler2DShadow => TypeSpecifierNonArrayJson::Sampler2DShadow,
            TypeSpecifierNonArray::Sampler2DRectShadow => {
                TypeSpecifierNonArrayJson::Sampler2DRectShadow
            }
            TypeSpecifierNonArray::Sampler1DArrayShadow => {
                TypeSpecifierNonArrayJson::Sampler1DArrayShadow
            }
            TypeSpecifierNonArray::Sampler2DArrayShadow => {
                TypeSpecifierNonArrayJson::Sampler2DArrayShadow
            }
            TypeSpecifierNonArray::SamplerCubeShadow => {
                TypeSpecifierNonArrayJson::SamplerCubeShadow
            }
            TypeSpecifierNonArray::SamplerCubeArrayShadow => {
                TypeSpecifierNonArrayJson::SamplerCubeArrayShadow
            }
            TypeSpecifierNonArray::ISampler1D => TypeSpecifierNonArrayJson::ISampler1D,
            TypeSpecifierNonArray::IImage1D => TypeSpecifierNonArrayJson::IImage1D,
            TypeSpecifierNonArray::ISampler2D => TypeSpecifierNonArrayJson::ISampler2D,
            TypeSpecifierNonArray::IImage2D => TypeSpecifierNonArrayJson::IImage2D,
            TypeSpecifierNonArray::ISampler3D => TypeSpecifierNonArrayJson::ISampler3D,
            TypeSpecifierNonArray::IImage3D => TypeSpecifierNonArrayJson::IImage3D,
            TypeSpecifierNonArray::ISamplerCube => TypeSpecifierNonArrayJson::ISamplerCube,
            TypeSpecifierNonArray::IImageCube => TypeSpecifierNonArrayJson::IImageCube,
            TypeSpecifierNonArray::ISampler2DRect => TypeSpecifierNonArrayJson::ISampler2DRect,
            TypeSpecifierNonArray::IImage2DRect => TypeSpecifierNonArrayJson::IImage2DRect,
            TypeSpecifierNonArray::ISampler1DArray => TypeSpecifierNonArrayJson::ISampler1DArray,
            TypeSpecifierNonArray::IImage1DArray => TypeSpecifierNonArrayJson::IImage1DArray,
            TypeSpecifierNonArray::ISampler2DArray => TypeSpecifierNonArrayJson::ISampler2DArray,
            TypeSpecifierNonArray::IImage2DArray => TypeSpecifierNonArrayJson::IImage2DArray,
            TypeSpecifierNonArray::ISamplerBuffer => TypeSpecifierNonArrayJson::ISamplerBuffer,
            TypeSpecifierNonArray::IImageBuffer => TypeSpecifierNonArrayJson::IImageBuffer,
            TypeSpecifierNonArray::ISampler2DMS => TypeSpecifierNonArrayJson::ISampler2DMS,
            TypeSpecifierNonArray::IImage2DMS => TypeSpecifierNonArrayJson::IImage2DMS,
            TypeSpecifierNonArray::ISampler2DMSArray => {
                TypeSpecifierNonArrayJson::ISampler2DMSArray
            }
            TypeSpecifierNonArray::IImage2DMSArray => {
                TypeSpecifierNonArrayJson::IImage2DMSArray
            }
            TypeSpecifierNonArray::ISamplerCubeArray => {
                TypeSpecifierNonArrayJson::ISamplerCubeArray
            }
            TypeSpecifierNonArray::IImageCubeArray => TypeSpecifierNonArrayJson::IImageCubeArray,
            TypeSpecifierNonArray::AtomicUInt => TypeSpecifierNonArrayJson::AtomicUInt,
            TypeSpecifierNonArray::USampler1D => TypeSpecifierNonArrayJson::USampler1D,
            TypeSpecifierNonArray::UImage1D => TypeSpecifierNonArrayJson::UImage1D,
            TypeSpecifierNonArray::USampler2D => TypeSpecifierNonArrayJson::USampler2D,
            TypeSpecifierNonArray::UImage2D => TypeSpecifierNonArrayJson::UImage2D,
            TypeSpecifierNonArray::USampler3D => TypeSpecifierNonArrayJson::USampler3D,
            TypeSpecifierNonArray::UImage3D => TypeSpecifierNonArrayJson::UImage3D,
            TypeSpecifierNonArray::USamplerCube => TypeSpecifierNonArrayJson::USamplerCube,
            TypeSpecifierNonArray::UImageCube => TypeSpecifierNonArrayJson::UImageCube,
            TypeSpecifierNonArray::USampler2DRect => TypeSpecifierNonArrayJson::USampler2DRect,
            TypeSpecifierNonArray::UImage2DRect => TypeSpecifierNonArrayJson::UImage2DRect,
            TypeSpecifierNonArray::USampler1DArray => TypeSpecifierNonArrayJson::USampler1DArray,
            TypeSpecifierNonArray::UImage1DArray => TypeSpecifierNonArrayJson::UImage1DArray,
            TypeSpecifierNonArray::USampler2DArray => TypeSpecifierNonArrayJson::USampler2DArray,
            TypeSpecifierNonArray::UImage2DArray => TypeSpecifierNonArrayJson::UImage2DArray,
            TypeSpecifierNonArray::USamplerBuffer => TypeSpecifierNonArrayJson::USamplerBuffer,
            TypeSpecifierNonArray::UImageBuffer => TypeSpecifierNonArrayJson::UImageBuffer,
            TypeSpecifierNonArray::USampler2DMS => TypeSpecifierNonArrayJson::USampler2DMS,
            TypeSpecifierNonArray::UImage2DMS => TypeSpecifierNonArrayJson::UImage2DMS,
            TypeSpecifierNonArray::USampler2DMSArray => {
                TypeSpecifierNonArrayJson::USampler2DMSArray
            }
            TypeSpecifierNonArray::UImage2DMSArray => {
                TypeSpecifierNonArrayJson::UImage2DMSArray
            }
            TypeSpecifierNonArray::USamplerCubeArray => {
                TypeSpecifierNonArrayJson::USamplerCubeArray
            }
            TypeSpecifierNonArray::UImageCubeArray => TypeSpecifierNonArrayJson::UImageCubeArray,
            TypeSpecifierNonArray::Struct(spec) => TypeSpecifierNonArrayJson::Struct {
                spec: spec.into(),
            },
            TypeSpecifierNonArray::TypeName(name) => TypeSpecifierNonArrayJson::TypeName {
                name: name.0,
            },
        }
    }
}

impl From<StructSpecifier> for StructSpecifierJson {
    fn from(spec: StructSpecifier) -> Self {
        StructSpecifierJson {
            name: spec.name.map(|n| n.0),
            fields: spec.fields.into_iter().map(|f| f.into()).collect(),
        }
    }
}

impl From<StructFieldSpecifier> for StructFieldSpecifierJson {
    fn from(spec: StructFieldSpecifier) -> Self {
        StructFieldSpecifierJson {
            qualifier: spec.qualifier.map(|q| q.into()),
            ty: spec.ty.into(),
            identifiers: spec
                .identifiers
                .into_iter()
                .map(|id| id.into())
                .collect(),
        }
    }
}

impl From<ArrayedIdentifier> for ArrayedIdentifierJson {
    fn from(id: ArrayedIdentifier) -> Self {
        ArrayedIdentifierJson {
            ident: id.ident.0,
            array_spec: id.array_spec.map(|s| s.into()),
        }
    }
}

impl From<ArraySpecifier> for ArraySpecifierJson {
    fn from(spec: ArraySpecifier) -> Self {
        ArraySpecifierJson {
            dimensions: spec
                .dimensions
                .into_iter()
                .map(|d| d.into())
                .collect(),
        }
    }
}

impl From<ArraySpecifierDimension> for ArraySpecifierDimensionJson {
    fn from(dim: ArraySpecifierDimension) -> Self {
        match dim {
            ArraySpecifierDimension::Unsized => ArraySpecifierDimensionJson::Unsized,
            ArraySpecifierDimension::ExplicitlySized(expr) => {
                ArraySpecifierDimensionJson::ExplicitlySized {
                    expr: Box::new((*expr).into()),
                }
            }
        }
    }
}

impl From<FunctionParameterDeclaration> for FunctionParameterDeclarationJson {
    fn from(decl: FunctionParameterDeclaration) -> Self {
        match decl {
            FunctionParameterDeclaration::Named(qualifier, declarator) => {
                FunctionParameterDeclarationJson::Named {
                    qualifier: qualifier.map(|q| q.into()),
                    declarator: declarator.into(),
                }
            }
            FunctionParameterDeclaration::Unnamed(qualifier, ty) => {
                FunctionParameterDeclarationJson::Unnamed {
                    qualifier: qualifier.map(|q| q.into()),
                    ty: ty.into(),
                }
            }
        }
    }
}

impl From<FunctionParameterDeclarator> for FunctionParameterDeclaratorJson {
    fn from(decl: FunctionParameterDeclarator) -> Self {
        FunctionParameterDeclaratorJson {
            ty: decl.ty.into(),
            ident: decl.ident.into(),
        }
    }
}

impl From<CompoundStatement> for CompoundStatementJson {
    fn from(stmt: CompoundStatement) -> Self {
        CompoundStatementJson {
            statement_list: stmt.statement_list.into_iter().map(|s| s.into()).collect(),
        }
    }
}

impl From<Statement> for StatementJson {
    fn from(stmt: Statement) -> Self {
        match stmt {
            Statement::Compound(stmt) => StatementJson::Compound {
                statement: Box::new((*stmt).into()),
            },
            Statement::Simple(stmt) => StatementJson::Simple {
                statement: Box::new((*stmt).into()),
            },
        }
    }
}

impl From<SimpleStatement> for SimpleStatementJson {
    fn from(stmt: SimpleStatement) -> Self {
        match stmt {
            SimpleStatement::Declaration(decl) => SimpleStatementJson::Declaration {
                declaration: decl.into(),
            },
            SimpleStatement::Expression(expr) => SimpleStatementJson::Expression {
                expression: expr.map(|e| e.into()),
            },
            SimpleStatement::Selection(selection) => SimpleStatementJson::Selection {
                selection: selection.into(),
            },
            SimpleStatement::Switch(switch) => SimpleStatementJson::Switch {
                switch: switch.into(),
            },
            SimpleStatement::CaseLabel(case_label) => SimpleStatementJson::CaseLabel {
                case_label: case_label.into(),
            },
            SimpleStatement::Iteration(iteration) => SimpleStatementJson::Iteration {
                iteration: iteration.into(),
            },
            SimpleStatement::Jump(jump) => SimpleStatementJson::Jump { jump: jump.into() },
        }
    }
}

impl From<Declaration> for DeclarationJson {
    fn from(decl: Declaration) -> Self {
        match decl {
            Declaration::FunctionPrototype(prototype) => DeclarationJson::FunctionPrototype {
                prototype: prototype.into(),
            },
            Declaration::InitDeclaratorList(list) => DeclarationJson::InitDeclaratorList {
                head: list.head.into(),
                tail: list.tail.into_iter().map(|t| t.into()).collect(),
            },
            Declaration::Precision(precision, ty) => DeclarationJson::Precision {
                precision: precision.into(),
                ty: ty.into(),
            },
            Declaration::Block(block) => DeclarationJson::Block {
                qualifier: block.qualifier.into(),
                name: block.name.0,
                fields: block.fields.into_iter().map(|f| f.into()).collect(),
                identifier: block.identifier.map(|id| id.into()),
            },
            Declaration::Global(qualifier, identifiers) => DeclarationJson::Global {
                qualifier: qualifier.into(),
                identifiers: identifiers.into_iter().map(|id| id.0).collect(),
            },
        }
    }
}

impl From<SingleDeclaration> for SingleDeclarationJson {
    fn from(decl: SingleDeclaration) -> Self {
        SingleDeclarationJson {
            ty: decl.ty.into(),
            name: decl.name.map(|n| n.0),
            array_specifier: decl.array_specifier.map(|s| s.into()),
            initializer: decl.initializer.map(|i| i.into()),
        }
    }
}

impl From<SingleDeclarationNoType> for SingleDeclarationNoTypeJson {
    fn from(decl: SingleDeclarationNoType) -> Self {
        SingleDeclarationNoTypeJson {
            ident: decl.ident.into(),
            initializer: decl.initializer.map(|i| i.into()),
        }
    }
}

impl From<Initializer> for InitializerJson {
    fn from(init: Initializer) -> Self {
        match init {
            Initializer::Simple(expr) => InitializerJson::Simple {
                expr: Box::new((*expr).into()),
            },
            Initializer::List(initializers) => InitializerJson::List {
                initializers: initializers.into_iter().map(|i| i.into()).collect(),
            },
        }
    }
}

impl From<SelectionStatement> for SelectionStatementJson {
    fn from(stmt: SelectionStatement) -> Self {
        SelectionStatementJson {
            cond: Box::new((*stmt.cond).into()),
            rest: stmt.rest.into(),
        }
    }
}

impl From<SelectionRestStatement> for SelectionRestStatementJson {
    fn from(stmt: SelectionRestStatement) -> Self {
        match stmt {
            SelectionRestStatement::Statement(stmt) => SelectionRestStatementJson::Statement {
                statement: Box::new((*stmt).into()),
            },
            SelectionRestStatement::Else(stmt, else_stmt) => {
                SelectionRestStatementJson::Else {
                    statement: Box::new((*stmt).into()),
                    else_statement: Box::new((*else_stmt).into()),
                }
            }
        }
    }
}

impl From<SwitchStatement> for SwitchStatementJson {
    fn from(stmt: SwitchStatement) -> Self {
        SwitchStatementJson {
            head: Box::new((*stmt.head).into()),
            body: stmt.body.into_iter().map(|s| s.into()).collect(),
        }
    }
}

impl From<CaseLabel> for CaseLabelJson {
    fn from(label: CaseLabel) -> Self {
        match label {
            CaseLabel::Case(expr) => CaseLabelJson::Case {
                expr: Box::new((*expr).into()),
            },
            CaseLabel::Def => CaseLabelJson::Def,
        }
    }
}

impl From<IterationStatement> for IterationStatementJson {
    fn from(stmt: IterationStatement) -> Self {
        match stmt {
            IterationStatement::While(condition, stmt) => IterationStatementJson::While {
                condition: condition.into(),
                statement: Box::new((*stmt).into()),
            },
            IterationStatement::DoWhile(stmt, cond) => IterationStatementJson::DoWhile {
                statement: Box::new((*stmt).into()),
                cond: Box::new((*cond).into()),
            },
            IterationStatement::For(init, rest, stmt) => IterationStatementJson::For {
                init: init.into(),
                rest: rest.into(),
                statement: Box::new((*stmt).into()),
            },
        }
    }
}

impl From<Condition> for ConditionJson {
    fn from(cond: Condition) -> Self {
        match cond {
            Condition::Expr(expr) => ConditionJson::Expr {
                expr: Box::new((*expr).into()),
            },
            Condition::Assignment(ty, ident, initializer) => ConditionJson::Assignment {
                ty: ty.into(),
                ident: ident.0,
                initializer: initializer.into(),
            },
        }
    }
}

impl From<ForInitStatement> for ForInitStatementJson {
    fn from(stmt: ForInitStatement) -> Self {
        match stmt {
            ForInitStatement::Expression(expr) => ForInitStatementJson::Expression {
                expr: expr.map(|e| e.into()),
            },
            ForInitStatement::Declaration(decl) => ForInitStatementJson::Declaration {
                declaration: Box::new((*decl).into()),
            },
        }
    }
}

impl From<ForRestStatement> for ForRestStatementJson {
    fn from(stmt: ForRestStatement) -> Self {
        ForRestStatementJson {
            condition: stmt.condition.map(|c| c.into()),
            post_expr: stmt.post_expr.map(|e| Box::new((*e).into())),
        }
    }
}

impl From<JumpStatement> for JumpStatementJson {
    fn from(stmt: JumpStatement) -> Self {
        match stmt {
            JumpStatement::Continue => JumpStatementJson::Continue,
            JumpStatement::Break => JumpStatementJson::Break,
            JumpStatement::Return(expr) => JumpStatementJson::Return {
                expr: expr.map(|e| Box::new((*e).into())),
            },
            JumpStatement::Discard => JumpStatementJson::Discard,
        }
    }
}

impl From<Expr> for ExprJson {
    fn from(expr: Expr) -> Self {
        match expr {
            Expr::Variable(ident) => ExprJson::Variable { ident: ident.0 },
            Expr::IntConst(value) => ExprJson::IntConst { value },
            Expr::UIntConst(value) => ExprJson::UIntConst { value },
            Expr::BoolConst(value) => ExprJson::BoolConst { value },
            Expr::FloatConst(value) => ExprJson::FloatConst { value },
            Expr::DoubleConst(value) => ExprJson::DoubleConst { value },
            Expr::Unary(op, expr) => ExprJson::Unary {
                op: op.into(),
                expr: Box::new((*expr).into()),
            },
            Expr::Binary(op, left, right) => ExprJson::Binary {
                op: op.into(),
                left: Box::new((*left).into()),
                right: Box::new((*right).into()),
            },
            Expr::Ternary(cond, left, right) => ExprJson::Ternary {
                cond: Box::new((*cond).into()),
                left: Box::new((*left).into()),
                right: Box::new((*right).into()),
            },
            Expr::Assignment(left, op, right) => ExprJson::Assignment {
                left: Box::new((*left).into()),
                op: op.into(),
                right: Box::new((*right).into()),
            },
            Expr::Bracket(expr, array_spec) => ExprJson::Bracket {
                expr: Box::new((*expr).into()),
                array_spec: array_spec.into(),
            },
            Expr::FunCall(fun_ident, args) => ExprJson::FunCall {
                fun_ident: fun_ident.into(),
                args: args.into_iter().map(|a| a.into()).collect(),
            },
            Expr::Dot(expr, ident) => ExprJson::Dot {
                expr: Box::new((*expr).into()),
                ident: ident.0,
            },
            Expr::PostInc(expr) => ExprJson::PostInc {
                expr: Box::new((*expr).into()),
            },
            Expr::PostDec(expr) => ExprJson::PostDec {
                expr: Box::new((*expr).into()),
            },
            Expr::Comma(left, right) => ExprJson::Comma {
                left: Box::new((*left).into()),
                right: Box::new((*right).into()),
            },
        }
    }
}

impl From<UnaryOp> for UnaryOpJson {
    fn from(op: UnaryOp) -> Self {
        match op {
            UnaryOp::Inc => UnaryOpJson::Inc,
            UnaryOp::Dec => UnaryOpJson::Dec,
            UnaryOp::Add => UnaryOpJson::Add,
            UnaryOp::Minus => UnaryOpJson::Minus,
            UnaryOp::Not => UnaryOpJson::Not,
            UnaryOp::Complement => UnaryOpJson::Complement,
        }
    }
}

impl From<BinaryOp> for BinaryOpJson {
    fn from(op: BinaryOp) -> Self {
        match op {
            BinaryOp::Or => BinaryOpJson::Or,
            BinaryOp::Xor => BinaryOpJson::Xor,
            BinaryOp::And => BinaryOpJson::And,
            BinaryOp::BitOr => BinaryOpJson::BitOr,
            BinaryOp::BitXor => BinaryOpJson::BitXor,
            BinaryOp::BitAnd => BinaryOpJson::BitAnd,
            BinaryOp::Equal => BinaryOpJson::Equal,
            BinaryOp::NonEqual => BinaryOpJson::NonEqual,
            BinaryOp::LT => BinaryOpJson::LT,
            BinaryOp::GT => BinaryOpJson::GT,
            BinaryOp::LTE => BinaryOpJson::LTE,
            BinaryOp::GTE => BinaryOpJson::GTE,
            BinaryOp::LShift => BinaryOpJson::LShift,
            BinaryOp::RShift => BinaryOpJson::RShift,
            BinaryOp::Add => BinaryOpJson::Add,
            BinaryOp::Sub => BinaryOpJson::Sub,
            BinaryOp::Mult => BinaryOpJson::Mult,
            BinaryOp::Div => BinaryOpJson::Div,
            BinaryOp::Mod => BinaryOpJson::Mod,
        }
    }
}

impl From<AssignmentOp> for AssignmentOpJson {
    fn from(op: AssignmentOp) -> Self {
        match op {
            AssignmentOp::Equal => AssignmentOpJson::Equal,
            AssignmentOp::Mult => AssignmentOpJson::Mult,
            AssignmentOp::Div => AssignmentOpJson::Div,
            AssignmentOp::Mod => AssignmentOpJson::Mod,
            AssignmentOp::Add => AssignmentOpJson::Add,
            AssignmentOp::Sub => AssignmentOpJson::Sub,
            AssignmentOp::LShift => AssignmentOpJson::LShift,
            AssignmentOp::RShift => AssignmentOpJson::RShift,
            AssignmentOp::And => AssignmentOpJson::And,
            AssignmentOp::Xor => AssignmentOpJson::Xor,
            AssignmentOp::Or => AssignmentOpJson::Or,
        }
    }
}

impl From<FunIdentifier> for FunIdentifierJson {
    fn from(ident: FunIdentifier) -> Self {
        match ident {
            FunIdentifier::Identifier(ident) => FunIdentifierJson::Identifier { ident: ident.0 },
            FunIdentifier::Expr(expr) => FunIdentifierJson::Expr {
                expr: Box::new((*expr).into()),
            },
        }
    }
}

#[test]
fn test1() {
    let glsl = "
  layout (location = 0) in vec3 pos;
  layout (location = 1) in vec4 col;

  out vec4 v_col;

  uniform mat4 projview;

  void main() {
    v_col = col; // pass color to the next stage
    gl_Position = projview * vec4(pos, 1.);
  }
";
    let stage_result = ShaderStage::parse(glsl);

    // 处理 Result 类型，确保我们处理的是 TranslationUnit
    let stage: TranslationUnit = match stage_result {
        Ok(unit) => unit,
        Err(error) => panic!("Failed to parse GLSL: {:?}", error),
    };

    // 将 TranslationUnit 转换为 ShaderStageJson，然后序列化
    let json_string = match serde_json::to_string(&ShaderStageJson::from(stage)) {
        Ok(json) => json,
        Err(error) => panic!("Failed to serialize to JSON: {:?}", error),
    };

    let s = &"";
}

#[wasm_bindgen]
pub fn test(glsl: &str) -> JsValue {
    let stage_result = ShaderStage::parse(glsl);

    // 处理 Result 类型，确保我们处理的是 TranslationUnit
    let stage: TranslationUnit = match stage_result {
        Ok(unit) => unit,
        Err(error) => panic!("Failed to parse GLSL: {:?}", error),
    };

    // 将 TranslationUnit 转换为 ShaderStageJson
    let shader_stage_json = ShaderStageJson::from(stage);

    // 将 ShaderStageJson 结构体转换为 JsValue
    serde_wasm_bindgen::to_value(&shader_stage_json).unwrap()
}
