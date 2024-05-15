export interface ShaderStage {
  declarations: ExternalDeclarationJson[];
}

export type ExternalDeclarationJson =
  | { tag: 'Preprocessor'; value: PreprocessorJson }
  | { tag: 'FunctionDefinition'; value: FunctionDefinitionJson }
  | { tag: 'Declaration'; value: DeclarationJson };

export type PreprocessorJson =
  | { type: 'Define'; define: PreprocessorDefineJson }
  | { type: 'Else' }
  | { type: 'ElIf'; condition: string }
  | { type: 'EndIf' }
  | { type: 'Error'; message: string }
  | { type: 'If'; condition: string }
  | { type: 'IfDef'; ident: string }
  | { type: 'IfNDef'; ident: string }
  | { type: 'Include'; path: PathJson }
  | { type: 'Line'; line: number; source_string_number?: number }
  | { type: 'Pragma'; command: string }
  | { type: 'Undef'; name: string }
  | { type: 'Version'; version: number; profile?: PreprocessorVersionProfileJson }
  | { type: 'Extension'; name: PreprocessorExtensionNameJson; behavior?: PreprocessorExtensionBehaviorJson };

export type PreprocessorDefineJson =
  | { type: 'ObjectLike'; ident: string; value: string }
  | { type: 'FunctionLike'; ident: string; args: string[]; value: string };

export type PathJson =
  | { type: 'Absolute'; path: string }
  | { type: 'Relative'; path: string };

export type PreprocessorVersionProfileJson =
  | { type: 'Core' }
  | { type: 'Compatibility' }
  | { type: 'ES' };

export type PreprocessorExtensionNameJson =
  | { type: 'All' }
  | { type: 'Specific'; name: string };

export type PreprocessorExtensionBehaviorJson =
  | { type: 'Require' }
  | { type: 'Enable' }
  | { type: 'Warn' }
  | { type: 'Disable' };

export interface FunctionDefinitionJson {
  prototype: FunctionPrototypeJson;
  statement: CompoundStatementJson;
}

export interface FunctionPrototypeJson {
  ty: FullySpecifiedTypeJson;
  name: string;
  parameters: FunctionParameterDeclarationJson[];
}

export interface FullySpecifiedTypeJson {
  qualifier?: TypeQualifierJson;
  ty: TypeSpecifierJson;
}

export interface TypeQualifierJson {
  qualifiers: TypeQualifierSpecJson[];
}

export type TypeQualifierSpecJson =
  | { type: 'Storage'; storage: StorageQualifierJson }
  | { type: 'Layout'; ids: LayoutQualifierSpecJson[] }
  | { type: 'Precision'; precision: PrecisionQualifierJson }
  | { type: 'Interpolation'; interpolation: InterpolationQualifierJson }
  | { type: 'Invariant' }
  | { type: 'Precise' };

export type StorageQualifierJson =
  | { type: 'Const' }
  | { type: 'InOut' }
  | { type: 'In' }
  | { type: 'Out' }
  | { type: 'Centroid' }
  | { type: 'Patch' }
  | { type: 'Sample' }
  | { type: 'Uniform' }
  | { type: 'Attribute' }
  | { type: 'Varying' }
  | { type: 'Buffer' }
  | { type: 'Shared' }
  | { type: 'Coherent' }
  | { type: 'Volatile' }
  | { type: 'Restrict' }
  | { type: 'ReadOnly' }
  | { type: 'WriteOnly' }
  | { type: 'Subroutine'; types: string[] };

export type LayoutQualifierSpecJson =
  | { type: 'Identifier'; ident: string; expr?: ExprJson }
  | { type: 'Shared' };

export type PrecisionQualifierJson =
  | { type: 'High' }
  | { type: 'Medium' }
  | { type: 'Low' };

export type InterpolationQualifierJson =
  | { type: 'Smooth' }
  | { type: 'Flat' }
  | { type: 'NoPerspective' };

export interface TypeSpecifierJson {
  ty: TypeSpecifierNonArrayJson;
  array_specifier?: ArraySpecifierJson;
}

export type TypeSpecifierNonArrayJson =
  | { type: 'Void' }
  | { type: 'Bool' }
  | { type: 'Int' }
  | { type: 'UInt' }
  | { type: 'Float' }
  | { type: 'Double' }
  | { type: 'Vec2' }
  | { type: 'Vec3' }
  | { type: 'Vec4' }
  | { type: 'DVec2' }
  | { type: 'DVec3' }
  | { type: 'DVec4' }
  | { type: 'BVec2' }
  | { type: 'BVec3' }
  | { type: 'BVec4' }
  | { type: 'IVec2' }
  | { type: 'IVec3' }
  | { type: 'IVec4' }
  | { type: 'UVec2' }
  | { type: 'UVec3' }
  | { type: 'UVec4' }
  | { type: 'Mat2' }
  | { type: 'Mat3' }
  | { type: 'Mat4' }
  | { type: 'Mat23' }
  | { type: 'Mat24' }
  | { type: 'Mat32' }
  | { type: 'Mat34' }
  | { type: 'Mat42' }
  | { type: 'Mat43' }
  | { type: 'DMat2' }
  | { type: 'DMat3' }
  | { type: 'DMat4' }
  | { type: 'DMat23' }
  | { type: 'DMat24' }
  | { type: 'DMat32' }
  | { type: 'DMat34' }
  | { type: 'DMat42' }
  | { type: 'DMat43' }
  | { type: 'Sampler1D' }
  | { type: 'Image1D' }
  | { type: 'Sampler2D' }
  | { type: 'Image2D' }
  | { type: 'Sampler3D' }
  | { type: 'Image3D' }
  | { type: 'SamplerCube' }
  | { type: 'ImageCube' }
  | { type: 'Sampler2DRect' }
  | { type: 'Image2DRect' }
  | { type: 'Sampler1DArray' }
  | { type: 'Image1DArray' }
  | { type: 'Sampler2DArray' }
  | { type: 'Image2DArray' }
  | { type: 'SamplerBuffer' }
  | { type: 'ImageBuffer' }
  | { type: 'Sampler2DMS' }
  | { type: 'Image2DMS' }
  | { type: 'Sampler2DMSArray' }
  | { type: 'Image2DMSArray' }
  | { type: 'SamplerCubeArray' }
  | { type: 'ImageCubeArray' }
  | { type: 'Sampler1DShadow' }
  | { type: 'Sampler2DShadow' }
  | { type: 'Sampler2DRectShadow' }
  | { type: 'Sampler1DArrayShadow' }
  | { type: 'Sampler2DArrayShadow' }
  | { type: 'SamplerCubeShadow' }
  | { type: 'SamplerCubeArrayShadow' }
  | { type: 'ISampler1D' }
  | { type: 'IImage1D' }
  | { type: 'ISampler2D' }
  | { type: 'IImage2D' }
  | { type: 'ISampler3D' }
  | { type: 'IImage3D' }
  | { type: 'ISamplerCube' }
  | { type: 'IImageCube' }
  | { type: 'ISampler2DRect' }
  | { type: 'IImage2DRect' }
  | { type: 'ISampler1DArray' }
  | { type: 'IImage1DArray' }
  | { type: 'ISampler2DArray' }
  | { type: 'IImage2DArray' }
  | { type: 'ISamplerBuffer' }
  | { type: 'IImageBuffer' }
  | { type: 'ISampler2DMS' }
  | { type: 'IImage2DMS' }
  | { type: 'ISampler2DMSArray' }
  | { type: 'IImage2DMSArray' }
  | { type: 'ISamplerCubeArray' }
  | { type: 'IImageCubeArray' }
  | { type: 'AtomicUInt' }
  | { type: 'USampler1D' }
  | { type: 'UImage1D' }
  | { type: 'USampler2D' }
  | { type: 'UImage2D' }
  | { type: 'USampler3D' }
  | { type: 'UImage3D' }
  | { type: 'USamplerCube' }
  | { type: 'UImageCube' }
  | { type: 'USampler2DRect' }
  | { type: 'UImage2DRect' }
  | { type: 'USampler1DArray' }
  | { type: 'UImage1DArray' }
  | { type: 'USampler2DArray' }
  | { type: 'UImage2DArray' }
  | { type: 'USamplerBuffer' }
  | { type: 'UImageBuffer' }
  | { type: 'USampler2DMS' }
  | { type: 'UImage2DMS' }
  | { type: 'USampler2DMSArray' }
  | { type: 'UImage2DMSArray' }
  | { type: 'USamplerCubeArray' }
  | { type: 'UImageCubeArray' }
  | { type: 'Struct'; spec: StructSpecifierJson }
  | { type: 'TypeName'; name: string };

export interface StructSpecifierJson {
  name?: string;
  fields: StructFieldSpecifierJson[];
}

export interface StructFieldSpecifierJson {
  qualifier?: TypeQualifierJson;
  ty: TypeSpecifierJson;
  identifiers: ArrayedIdentifierJson[];
}

export interface ArrayedIdentifierJson {
  ident: string;
  array_spec?: ArraySpecifierJson;
}

export interface ArraySpecifierJson {
  dimensions: ArraySpecifierDimensionJson[];
}

export type ArraySpecifierDimensionJson =
  | { type: 'Unsized' }
  | { type: 'ExplicitlySized'; expr: ExprJson };

export type FunctionParameterDeclarationJson =
  | { type: 'Named'; qualifier?: TypeQualifierJson; declarator: FunctionParameterDeclaratorJson }
  | { type: 'Unnamed'; qualifier?: TypeQualifierJson; ty: TypeSpecifierJson };

export interface FunctionParameterDeclaratorJson {
  ty: TypeSpecifierJson;
  ident: ArrayedIdentifierJson;
}

export interface CompoundStatementJson {
  statement_list: StatementJson[];
}

export type StatementJson =
  | { type: 'Compound'; statement: CompoundStatementJson }
  | { type: 'Simple'; statement: SimpleStatementJson };

export type SimpleStatementJson =
  | { type: 'Declaration'; declaration: DeclarationJson }
  | { type: 'Expression'; expression?: ExprJson }
  | { type: 'Selection'; selection: SelectionStatementJson }
  | { type: 'Switch'; switch: SwitchStatementJson }
  | { type: 'CaseLabel'; case_label: CaseLabelJson }
  | { type: 'Iteration'; iteration: IterationStatementJson }
  | { type: 'Jump'; jump: JumpStatementJson };

export type DeclarationJson =
  | { type: 'FunctionPrototype'; prototype: FunctionPrototypeJson }
  | { type: 'InitDeclaratorList'; head: SingleDeclarationJson; tail: SingleDeclarationNoTypeJson[] }
  | { type: 'Precision'; precision: PrecisionQualifierJson; ty: TypeSpecifierJson }
  | { type: 'Block'; qualifier: TypeQualifierJson; name: string; fields: StructFieldSpecifierJson[]; identifier?: ArrayedIdentifierJson }
  | { type: 'Global'; qualifier: TypeQualifierJson; identifiers: string[] };

export interface SingleDeclarationJson {
  ty: FullySpecifiedTypeJson;
  name?: string;
  array_specifier?: ArraySpecifierJson;
  initializer?: InitializerJson;
}

export interface SingleDeclarationNoTypeJson {
  ident: ArrayedIdentifierJson;
  initializer?: InitializerJson;
}

export type InitializerJson =
  | { type: 'Simple'; expr: ExprJson }
  | { type: 'List'; initializers: InitializerJson[] };

export interface SelectionStatementJson {
  cond: ExprJson;
  rest: SelectionRestStatementJson;
}

export type SelectionRestStatementJson =
  | { type: 'Statement'; statement: StatementJson }
  | { type: 'Else'; statement: StatementJson; else_statement: StatementJson };

export interface SwitchStatementJson {
  head: ExprJson;
  body: StatementJson[];
}

export type CaseLabelJson =
  | { type: 'Case'; expr: ExprJson }
  | { type: 'Def' };

export type IterationStatementJson =
  | { type: 'While'; condition: ConditionJson; statement: StatementJson }
  | { type: 'DoWhile'; statement: StatementJson; cond: ExprJson }
  | { type: 'For'; init: ForInitStatementJson; rest: ForRestStatementJson; statement: StatementJson };

export type ConditionJson =
  | { type: 'Expr'; expr: ExprJson }
  | { type: 'Assignment'; ty: FullySpecifiedTypeJson; ident: string; initializer: InitializerJson };

export type ForInitStatementJson =
  | { type: 'Expression'; expr?: ExprJson }
  | { type: 'Declaration'; declaration: DeclarationJson };

export interface ForRestStatementJson {
  condition?: ConditionJson;
  post_expr?: ExprJson;
}

export type JumpStatementJson =
  | { type: 'Continue' }
  | { type: 'Break' }
  | { type: 'Return'; expr?: ExprJson }
  | { type: 'Discard' };

export type ExprJson =
  | { type: 'Variable'; ident: string }
  | { type: 'IntConst'; value: number }
  | { type: 'UIntConst'; value: number }
  | { type: 'BoolConst'; value: boolean }
  | { type: 'FloatConst'; value: number }
  | { type: 'DoubleConst'; value: number }
  | { type: 'Unary'; op: UnaryOpJson; expr: ExprJson }
  | { type: 'Binary'; op: BinaryOpJson; left: ExprJson; right: ExprJson }
  | { type: 'Ternary'; cond: ExprJson; left: ExprJson; right: ExprJson }
  | { type: 'Assignment'; left: ExprJson; op: AssignmentOpJson; right: ExprJson }
  | { type: 'Bracket'; expr: ExprJson; array_spec: ArraySpecifierJson }
  | { type: 'FunCall'; fun_ident: FunIdentifierJson; args: ExprJson[] }
  | { type: 'Dot'; expr: ExprJson; ident: string }
  | { type: 'PostInc'; expr: ExprJson }
  | { type: 'PostDec'; expr: ExprJson }
  | { type: 'Comma'; left: ExprJson; right: ExprJson };

export type UnaryOpJson =
  | { type: 'Inc' }
  | { type: 'Dec' }
  | { type: 'Add' }
  | { type: 'Minus' }
  | { type: 'Not' }
  | { type: 'Complement' };

export type BinaryOpJson =
  | { type: 'Or' }
  | { type: 'Xor' }
  | { type: 'And' }
  | { type: 'BitOr' }
  | { type: 'BitXor' }
  | { type: 'BitAnd' }
  | { type: 'Equal' }
  | { type: 'NonEqual' }
  | { type: 'LT' }
  | { type: 'GT' }
  | { type: 'LTE' }
  | { type: 'GTE' }
  | { type: 'LShift' }
  | { type: 'RShift' }
  | { type: 'Add' }
  | { type: 'Sub' }
  | { type: 'Mult' }
  | { type: 'Div' }
  | { type: 'Mod' };

export type AssignmentOpJson =
  | { type: 'Equal' }
  | { type: 'Mult' }
  | { type: 'Div' }
  | { type: 'Mod' }
  | { type: 'Add' }
  | { type: 'Sub' }
  | { type: 'LShift' }
  | { type: 'RShift' }
  | { type: 'And' }
  | { type: 'Xor' }
  | { type: 'Or' };

export type FunIdentifierJson =
  | { type: 'Identifier'; ident: string }
  | { type: 'Expr'; expr: ExprJson };
