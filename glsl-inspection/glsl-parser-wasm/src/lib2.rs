use serde::{Serialize, Serializer};

impl Serialize for ShaderStage {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        self.0.serialize(serializer)
    }
}

impl Serialize for Path {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Path::Absolute(ref s) => serializer.serialize_str(&format!("<{}>", s)),
            Path::Relative(ref s) => serializer.serialize_str(&format!("\"{}\"", s)),
        }
    }
}

impl Serialize for Identifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(self.as_str())
    }
}

impl Serialize for TypeName {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(self.as_str())
    }
}

impl Serialize for TypeSpecifierNonArray {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            TypeSpecifierNonArray::Void => serializer.serialize_str("void"),
            TypeSpecifierNonArray::Bool => serializer.serialize_str("bool"),
            TypeSpecifierNonArray::Int => serializer.serialize_str("int"),
            TypeSpecifierNonArray::UInt => serializer.serialize_str("uint"),
            TypeSpecifierNonArray::Float => serializer.serialize_str("float"),
            TypeSpecifierNonArray::Double => serializer.serialize_str("double"),
            TypeSpecifierNonArray::Vec2 => serializer.serialize_str("vec2"),
            TypeSpecifierNonArray::Vec3 => serializer.serialize_str("vec3"),
            TypeSpecifierNonArray::Vec4 => serializer.serialize_str("vec4"),
            TypeSpecifierNonArray::DVec2 => serializer.serialize_str("dvec2"),
            TypeSpecifierNonArray::DVec3 => serializer.serialize_str("dvec3"),
            TypeSpecifierNonArray::DVec4 => serializer.serialize_str("dvec4"),
            TypeSpecifierNonArray::BVec2 => serializer.serialize_str("bvec2"),
            TypeSpecifierNonArray::BVec3 => serializer.serialize_str("bvec3"),
            TypeSpecifierNonArray::BVec4 => serializer.serialize_str("bvec4"),
            TypeSpecifierNonArray::IVec2 => serializer.serialize_str("ivec2"),
            TypeSpecifierNonArray::IVec3 => serializer.serialize_str("ivec3"),
            TypeSpecifierNonArray::IVec4 => serializer.serialize_str("ivec4"),
            TypeSpecifierNonArray::UVec2 => serializer.serialize_str("uvec2"),
            TypeSpecifierNonArray::UVec3 => serializer.serialize_str("uvec3"),
            TypeSpecifierNonArray::UVec4 => serializer.serialize_str("uvec4"),
            TypeSpecifierNonArray::Mat2 => serializer.serialize_str("mat2"),
            TypeSpecifierNonArray::Mat3 => serializer.serialize_str("mat3"),
            TypeSpecifierNonArray::Mat4 => serializer.serialize_str("mat4"),
            TypeSpecifierNonArray::Mat23 => serializer.serialize_str("mat2x3"),
            TypeSpecifierNonArray::Mat24 => serializer.serialize_str("mat2x4"),
            TypeSpecifierNonArray::Mat32 => serializer.serialize_str("mat3x2"),
            TypeSpecifierNonArray::Mat34 => serializer.serialize_str("mat3x4"),
            TypeSpecifierNonArray::Mat42 => serializer.serialize_str("mat4x2"),
            TypeSpecifierNonArray::Mat43 => serializer.serialize_str("mat4x3"),
            TypeSpecifierNonArray::DMat2 => serializer.serialize_str("dmat2"),
            TypeSpecifierNonArray::DMat3 => serializer.serialize_str("dmat3"),
            TypeSpecifierNonArray::DMat4 => serializer.serialize_str("dmat4"),
            TypeSpecifierNonArray::DMat23 => serializer.serialize_str("dmat2x3"),
            TypeSpecifierNonArray::DMat24 => serializer.serialize_str("dmat2x4"),
            TypeSpecifierNonArray::DMat32 => serializer.serialize_str("dmat3x2"),
            TypeSpecifierNonArray::DMat34 => serializer.serialize_str("dmat3x4"),
            TypeSpecifierNonArray::DMat42 => serializer.serialize_str("dmat4x2"),
            TypeSpecifierNonArray::DMat43 => serializer.serialize_str("dmat4x3"),
            TypeSpecifierNonArray::Sampler1D => serializer.serialize_str("sampler1D"),
            TypeSpecifierNonArray::Image1D => serializer.serialize_str("image1D"),
            TypeSpecifierNonArray::Sampler2D => serializer.serialize_str("sampler2D"),
            TypeSpecifierNonArray::Image2D => serializer.serialize_str("image2D"),
            TypeSpecifierNonArray::Sampler3D => serializer.serialize_str("sampler3D"),
            TypeSpecifierNonArray::Image3D => serializer.serialize_str("image3D"),
            TypeSpecifierNonArray::SamplerCube => serializer.serialize_str("samplerCube"),
            TypeSpecifierNonArray::ImageCube => serializer.serialize_str("imageCube"),
            TypeSpecifierNonArray::Sampler2DRect => serializer.serialize_str("sampler2DRect"),
            TypeSpecifierNonArray::Image2DRect => serializer.serialize_str("image2DRect"),
            TypeSpecifierNonArray::Sampler1DArray => serializer.serialize_str("sampler1DArray"),
            TypeSpecifierNonArray::Image1DArray => serializer.serialize_str("image1DArray"),
            TypeSpecifierNonArray::Sampler2DArray => serializer.serialize_str("sampler2DArray"),
            TypeSpecifierNonArray::Image2DArray => serializer.serialize_str("image2DArray"),
            TypeSpecifierNonArray::SamplerBuffer => serializer.serialize_str("samplerBuffer"),
            TypeSpecifierNonArray::ImageBuffer => serializer.serialize_str("imageBuffer"),
            TypeSpecifierNonArray::Sampler2DMS => serializer.serialize_str("sampler2DMS"),
            TypeSpecifierNonArray::Image2DMS => serializer.serialize_str("image2DMS"),
            TypeSpecifierNonArray::Sampler2DMSArray => serializer.serialize_str("samplerDMSArray"),
            TypeSpecifierNonArray::Image2DMSArray => serializer.serialize_str("image2DMSArray"),
            TypeSpecifierNonArray::SamplerCubeArray => serializer.serialize_str("samplerCubeArray"),
            TypeSpecifierNonArray::ImageCubeArray => serializer.serialize_str("imageCubeArray"),
            TypeSpecifierNonArray::Sampler1DShadow => serializer.serialize_str("sampler1DShadow"),
            TypeSpecifierNonArray::Sampler2DShadow => serializer.serialize_str("sampler2DShadow"),
            TypeSpecifierNonArray::Sampler2DRectShadow => {
                serializer.serialize_str("sampler2DRectShadow")
            }
            TypeSpecifierNonArray::Sampler1DArrayShadow => {
                serializer.serialize_str("sampler1DArrayShadow")
            }
            TypeSpecifierNonArray::Sampler2DArrayShadow => {
                serializer.serialize_str("sampler2DArrayShadow")
            }
            TypeSpecifierNonArray::SamplerCubeShadow => serializer.serialize_str("samplerCubeShadow"),
            TypeSpecifierNonArray::SamplerCubeArrayShadow => {
                serializer.serialize_str("samplerCubeArrayShadow")
            }
            TypeSpecifierNonArray::ISampler1D => serializer.serialize_str("isampler1D"),
            TypeSpecifierNonArray::IImage1D => serializer.serialize_str("iimage1D"),
            TypeSpecifierNonArray::ISampler2D => serializer.serialize_str("isampler2D"),
            TypeSpecifierNonArray::IImage2D => serializer.serialize_str("iimage2D"),
            TypeSpecifierNonArray::ISampler3D => serializer.serialize_str("isampler3D"),
            TypeSpecifierNonArray::IImage3D => serializer.serialize_str("iimage3D"),
            TypeSpecifierNonArray::ISamplerCube => serializer.serialize_str("isamplerCube"),
            TypeSpecifierNonArray::IImageCube => serializer.serialize_str("iimageCube"),
            TypeSpecifierNonArray::ISampler2DRect => serializer.serialize_str("isampler2DRect"),
            TypeSpecifierNonArray::IImage2DRect => serializer.serialize_str("iimage2DRect"),
            TypeSpecifierNonArray::ISampler1DArray => serializer.serialize_str("isampler1DArray"),
            TypeSpecifierNonArray::IImage1DArray => serializer.serialize_str("iimage1DArray"),
            TypeSpecifierNonArray::ISampler2DArray => serializer.serialize_str("isampler2DArray"),
            TypeSpecifierNonArray::IImage2DArray => serializer.serialize_str("iimage2DArray"),
            TypeSpecifierNonArray::ISamplerBuffer => serializer.serialize_str("isamplerBuffer"),
            TypeSpecifierNonArray::IImageBuffer => serializer.serialize_str("iimageBuffer"),
            TypeSpecifierNonArray::ISampler2DMS => serializer.serialize_str("isampler2DMS"),
            TypeSpecifierNonArray::IImage2DMS => serializer.serialize_str("iimage2DMS"),
            TypeSpecifierNonArray::ISampler2DMSArray => serializer.serialize_str("isampler2DMSArray"),
            TypeSpecifierNonArray::IImage2DMSArray => serializer.serialize_str("iimage2DMSArray"),
            TypeSpecifierNonArray::ISamplerCubeArray => serializer.serialize_str("isamplerCubeArray"),
            TypeSpecifierNonArray::IImageCubeArray => serializer.serialize_str("iimageCubeArray"),
            TypeSpecifierNonArray::AtomicUInt => serializer.serialize_str("atomic_uint"),
            TypeSpecifierNonArray::USampler1D => serializer.serialize_str("usampler1D"),
            TypeSpecifierNonArray::UImage1D => serializer.serialize_str("uimage1D"),
            TypeSpecifierNonArray::USampler2D => serializer.serialize_str("usampler2D"),
            TypeSpecifierNonArray::UImage2D => serializer.serialize_str("uimage2D"),
            TypeSpecifierNonArray::USampler3D => serializer.serialize_str("usampler3D"),
            TypeSpecifierNonArray::UImage3D => serializer.serialize_str("uimage3D"),
            TypeSpecifierNonArray::USamplerCube => serializer.serialize_str("usamplerCube"),
            TypeSpecifierNonArray::UImageCube => serializer.serialize_str("uimageCube"),
            TypeSpecifierNonArray::USampler2DRect => serializer.serialize_str("usampler2DRect"),
            TypeSpecifierNonArray::UImage2DRect => serializer.serialize_str("uimage2DRect"),
            TypeSpecifierNonArray::USampler1DArray => serializer.serialize_str("usampler1DArray"),
            TypeSpecifierNonArray::UImage1DArray => serializer.serialize_str("uimage1DArray"),
            TypeSpecifierNonArray::USampler2DArray => serializer.serialize_str("usampler2DArray"),
            TypeSpecifierNonArray::UImage2DArray => serializer.serialize_str("uimage2DArray"),
            TypeSpecifierNonArray::USamplerBuffer => serializer.serialize_str("usamplerBuffer"),
            TypeSpecifierNonArray::UImageBuffer => serializer.serialize_str("uimageBuffer"),
            TypeSpecifierNonArray::USampler2DMS => serializer.serialize_str("usampler2DMS"),
            TypeSpecifierNonArray::UImage2DMS => serializer.serialize_str("uimage2DMS"),
            TypeSpecifierNonArray::USampler2DMSArray => serializer.serialize_str("usampler2DMSArray"),
            TypeSpecifierNonArray::UImage2DMSArray => serializer.serialize_str("uimage2DMSArray"),
            TypeSpecifierNonArray::USamplerCubeArray => serializer.serialize_str("usamplerCubeArray"),
            TypeSpecifierNonArray::UImageCubeArray => serializer.serialize_str("uimageCubeArray"),
            TypeSpecifierNonArray::Struct(ref s) => s.serialize(serializer),
            TypeSpecifierNonArray::TypeName(ref tn) => tn.serialize(serializer),
        }
    }
}

impl Serialize for TypeSpecifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("TypeSpecifier", 2)?;
        state.serialize_field("ty", &self.ty)?;
        state.serialize_field("array_specifier", &self.array_specifier)?;
        state.end()
    }
}

impl Serialize for StructSpecifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("StructSpecifier", 2)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("fields", &self.fields)?;
        state.end()
    }
}

impl Serialize for StructFieldSpecifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("StructFieldSpecifier", 3)?;
        state.serialize_field("qualifier", &self.qualifier)?;
        state.serialize_field("ty", &self.ty)?;
        state.serialize_field("identifiers", &self.identifiers)?;
        state.end()
    }
}

impl Serialize for ArrayedIdentifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("ArrayedIdentifier", 2)?;
        state.serialize_field("ident", &self.ident)?;
        state.serialize_field("array_spec", &self.array_spec)?;
        state.end()
    }
}

impl Serialize for TypeQualifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        self.qualifiers.serialize(serializer)
    }
}

impl Serialize for TypeQualifierSpec {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            TypeQualifierSpec::Storage(ref s) => s.serialize(serializer),
            TypeQualifierSpec::Layout(ref l) => l.serialize(serializer),
            TypeQualifierSpec::Precision(ref p) => p.serialize(serializer),
            TypeQualifierSpec::Interpolation(ref i) => i.serialize(serializer),
            TypeQualifierSpec::Invariant => serializer.serialize_str("invariant"),
            TypeQualifierSpec::Precise => serializer.serialize_str("precise"),
        }
    }
}

impl Serialize for StorageQualifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            StorageQualifier::Const => serializer.serialize_str("const"),
            StorageQualifier::InOut => serializer.serialize_str("inout"),
            StorageQualifier::In => serializer.serialize_str("in"),
            StorageQualifier::Out => serializer.serialize_str("out"),
            StorageQualifier::Centroid => serializer.serialize_str("centroid"),
            StorageQualifier::Patch => serializer.serialize_str("patch"),
            StorageQualifier::Sample => serializer.serialize_str("sample"),
            StorageQualifier::Uniform => serializer.serialize_str("uniform"),
            StorageQualifier::Attribute => serializer.serialize_str("attribute"),
            StorageQualifier::Varying => serializer.serialize_str("varying"),
            StorageQualifier::Buffer => serializer.serialize_str("buffer"),
            StorageQualifier::Shared => serializer.serialize_str("shared"),
            StorageQualifier::Coherent => serializer.serialize_str("coherent"),
            StorageQualifier::Volatile => serializer.serialize_str("volatile"),
            StorageQualifier::Restrict => serializer.serialize_str("restrict"),
            StorageQualifier::ReadOnly => serializer.serialize_str("readonly"),
            StorageQualifier::WriteOnly => serializer.serialize_str("writeonly"),
            StorageQualifier::Subroutine(ref tn) => {
                serializer.serialize_str(&format!("subroutine({})", tn.join(", ")))
            }
        }
    }
}

impl Serialize for LayoutQualifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("LayoutQualifier", 1)?;
        state.serialize_field("ids", &self.ids)?;
        state.end()
    }
}

impl Serialize for LayoutQualifierSpec {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            LayoutQualifierSpec::Identifier(ref i, Some(ref e)) => {
                serializer.serialize_str(&format!("{} = {}", i, e))
            }
            LayoutQualifierSpec::Identifier(ref i, None) => serializer.serialize_str(&i.to_string()),
            LayoutQualifierSpec::Shared => serializer.serialize_str("shared"),
        }
    }
}

impl Serialize for PrecisionQualifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            PrecisionQualifier::High => serializer.serialize_str("highp"),
            PrecisionQualifier::Medium => serializer.serialize_str("mediump"),
            PrecisionQualifier::Low => serializer.serialize_str("lowp"),
        }
    }
}

impl Serialize for InterpolationQualifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            InterpolationQualifier::Smooth => serializer.serialize_str("smooth"),
            InterpolationQualifier::Flat => serializer.serialize_str("flat"),
            InterpolationQualifier::NoPerspective => serializer.serialize_str("noperspective"),
        }
    }
}

impl Serialize for FullySpecifiedType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("FullySpecifiedType", 2)?;
        state.serialize_field("qualifier", &self.qualifier)?;
        state.serialize_field("ty", &self.ty)?;
        state.end()
    }
}

impl Serialize for ArraySpecifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!(
            "[{}]",
            self
                .dimensions
                .iter()
                .map(|d| match *d {
                    ArraySpecifierDimension::Unsized => "".to_owned(),
                    ArraySpecifierDimension::ExplicitlySized(ref e) => format!("{}", e),
                })
                .collect::<Vec<_>>()
                .join(", ")
        ))
    }
}

impl Serialize for Declaration {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Declaration::FunctionPrototype(ref fp) => fp.serialize(serializer),
            Declaration::InitDeclaratorList(ref idl) => idl.serialize(serializer),
            Declaration::Precision(ref pq, ref ts) => {
                serializer.serialize_str(&format!("{} {}", pq, ts))
            }
            Declaration::Block(ref b) => b.serialize(serializer),
            Declaration::Global(ref tq, ref ids) => {
                serializer.serialize_str(&format!("{} {}", tq, ids.join(", ")))
            }
        }
    }
}

impl Serialize for Block {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("Block", 4)?;
        state.serialize_field("qualifier", &self.qualifier)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("fields", &self.fields)?;
        state.serialize_field("identifier", &self.identifier)?;
        state.end()
    }
}

impl Serialize for FunIdentifier {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            FunIdentifier::Identifier(ref i) => i.serialize(serializer),
            FunIdentifier::Expr(ref e) => e.serialize(serializer),
        }
    }
}

impl Serialize for FunctionPrototype {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("FunctionPrototype", 3)?;
        state.serialize_field("ty", &self.ty)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("parameters", &self.parameters)?;
        state.end()
    }
}

impl Serialize for FunctionParameterDeclaration {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            FunctionParameterDeclaration::Named(ref tq, ref fpd) => {
                serializer.serialize_str(&format!("{} {}", tq.as_ref().map_or("", |t| format!("{}", t)), fpd))
            }
            FunctionParameterDeclaration::Unnamed(ref tq, ref ts) => {
                serializer.serialize_str(&format!("{} {}", tq.as_ref().map_or("", |t| format!("{}", t)), ts))
            }
        }
    }
}

impl Serialize for FunctionParameterDeclarator {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("{} {}", self.ty, self.ident))
    }
}

impl Serialize for InitDeclaratorList {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("InitDeclaratorList", 2)?;
        state.serialize_field("head", &self.head)?;
        state.serialize_field("tail", &self.tail)?;
        state.end()
    }
}

impl Serialize for SingleDeclaration {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("SingleDeclaration", 4)?;
        state.serialize_field("ty", &self.ty)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("array_specifier", &self.array_specifier)?;
        state.serialize_field("initializer", &self.initializer)?;
        state.end()
    }
}

impl Serialize for SingleDeclarationNoType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("SingleDeclarationNoType", 2)?;
        state.serialize_field("ident", &self.ident)?;
        state.serialize_field("initializer", &self.initializer)?;
        state.end()
    }
}

impl Serialize for Initializer {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Initializer::Simple(ref e) => e.serialize(serializer),
            Initializer::List(ref li) => li.serialize(serializer),
        }
    }
}

impl Serialize for Expr {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Expr::Variable(ref i) => i.serialize(serializer),
            Expr::IntConst(ref i) => i.serialize(serializer),
            Expr::UIntConst(ref u) => serializer.serialize_str(&format!("{}u", u)),
            Expr::BoolConst(ref b) => b.serialize(serializer),
            Expr::FloatConst(ref f) => f.serialize(serializer),
            Expr::DoubleConst(ref d) => d.serialize(serializer),
            Expr::Unary(ref uo, ref e) => serializer.serialize_str(&format!("{}{}", uo, e)),
            Expr::Binary(ref bo, ref e1, ref e2) => {
                serializer.serialize_str(&format!("{} {} {}", e1, bo, e2))
            }
            Expr::Ternary(ref c, ref s, ref e) => {
                serializer.serialize_str(&format!("{} ? {} : {}", c, s, e))
            }
            Expr::Assignment(ref v, ref ao, ref e) => {
                serializer.serialize_str(&format!("{} {} {}", v, ao, e))
            }
            Expr::Bracket(ref e, ref as_) => {
                serializer.serialize_str(&format!("{}{}", e, as_))
            }
            Expr::FunCall(ref fi, ref args) => {
                if args.is_empty() {
                    serializer.serialize_str(&format!("{}()", fi))
                } else {
                    serializer.serialize_str(&format!("{}({})", fi, args.join(", ")))
                }
            }
            Expr::Dot(ref e, ref i) => serializer.serialize_str(&format!("{}.{}", e, i)),
            Expr::PostInc(ref e) => serializer.serialize_str(&format!("{}++", e)),
            Expr::PostDec(ref e) => serializer.serialize_str(&format!("{}--", e)),
            Expr::Comma(ref lhs, ref rhs) => {
                serializer.serialize_str(&format!("{}, {}", lhs, rhs))
            }
        }
    }
}

impl Serialize for UnaryOp {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            UnaryOp::Inc => serializer.serialize_str("++"),
            UnaryOp::Dec => serializer.serialize_str("--"),
            UnaryOp::Add => serializer.serialize_str("+"),
            UnaryOp::Minus => serializer.serialize_str("-"),
            UnaryOp::Not => serializer.serialize_str("!"),
            UnaryOp::Complement => serializer.serialize_str("~"),
        }
    }
}

impl Serialize for BinaryOp {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            BinaryOp::Or => serializer.serialize_str("||"),
            BinaryOp::Xor => serializer.serialize_str("^^"),
            BinaryOp::And => serializer.serialize_str("&&"),
            BinaryOp::BitOr => serializer.serialize_str("|"),
            BinaryOp::BitXor => serializer.serialize_str("^"),
            BinaryOp::BitAnd => serializer.serialize_str("&"),
            BinaryOp::Equal => serializer.serialize_str("=="),
            BinaryOp::NonEqual => serializer.serialize_str("!="),
            BinaryOp::LT => serializer.serialize_str("<"),
            BinaryOp::GT => serializer.serialize_str(">"),
            BinaryOp::LTE => serializer.serialize_str("<="),
            BinaryOp::GTE => serializer.serialize_str(">="),
            BinaryOp::LShift => serializer.serialize_str("<<"),
            BinaryOp::RShift => serializer.serialize_str(">>"),
            BinaryOp::Add => serializer.serialize_str("+"),
            BinaryOp::Sub => serializer.serialize_str("-"),
            BinaryOp::Mult => serializer.serialize_str("*"),
            BinaryOp::Div => serializer.serialize_str("/"),
            BinaryOp::Mod => serializer.serialize_str("%"),
        }
    }
}

impl Serialize for AssignmentOp {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            AssignmentOp::Equal => serializer.serialize_str("="),
            AssignmentOp::Mult => serializer.serialize_str("*="),
            AssignmentOp::Div => serializer.serialize_str("/="),
            AssignmentOp::Mod => serializer.serialize_str("%="),
            AssignmentOp::Add => serializer.serialize_str("+="),
            AssignmentOp::Sub => serializer.serialize_str("-="),
            AssignmentOp::LShift => serializer.serialize_str("<<="),
            AssignmentOp::RShift => serializer.serialize_str(">>="),
            AssignmentOp::And => serializer.serialize_str("&="),
            AssignmentOp::Xor => serializer.serialize_str("^="),
            AssignmentOp::Or => serializer.serialize_str("|="),
        }
    }
}

impl Serialize for TranslationUnit {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        self.0.serialize(serializer)
    }
}

impl Serialize for ExternalDeclaration {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            ExternalDeclaration::Preprocessor(ref p) => p.serialize(serializer),
            ExternalDeclaration::FunctionDefinition(ref fd) => fd.serialize(serializer),
            ExternalDeclaration::Declaration(ref d) => d.serialize(serializer),
        }
    }
}

impl Serialize for FunctionDefinition {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("FunctionDefinition", 2)?;
        state.serialize_field("prototype", &self.prototype)?;
        state.serialize_field("statement", &self.statement)?;
        state.end()
    }
}

impl Serialize for CompoundStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("CompoundStatement", 1)?;
        state.serialize_field("statement_list", &self.statement_list)?;
        state.end()
    }
}

impl Serialize for Statement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Statement::Compound(ref cs) => cs.serialize(serializer),
            Statement::Simple(ref ss) => ss.serialize(serializer),
        }
    }
}

impl Serialize for SimpleStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            SimpleStatement::Declaration(ref d) => d.serialize(serializer),
            SimpleStatement::Expression(ref e) => {
                if let Some(ref expr) = *e {
                    serializer.serialize_str(&format!("{};", expr))
                } else {
                    serializer.serialize_str(";")
                }
            }
            SimpleStatement::Selection(ref s) => s.serialize(serializer),
            SimpleStatement::Switch(ref s) => s.serialize(serializer),
            SimpleStatement::CaseLabel(ref c) => c.serialize(serializer),
            SimpleStatement::Iteration(ref i) => i.serialize(serializer),
            SimpleStatement::Jump(ref j) => j.serialize(serializer),
        }
    }
}

impl Serialize for SelectionStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("SelectionStatement", 2)?;
        state.serialize_field("cond", &self.cond)?;
        state.serialize_field("rest", &self.rest)?;
        state.end()
    }
}

impl Serialize for Condition {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Condition::Expr(ref e) => e.serialize(serializer),
            Condition::Assignment(ref ty, ref ident, ref init) => {
                serializer.serialize_str(&format!("{} {} = {}", ty, ident, init))
            }
        }
    }
}

impl Serialize for SelectionRestStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            SelectionRestStatement::Statement(ref s) => s.serialize(serializer),
            SelectionRestStatement::Else(ref s1, ref s2) => {
                serializer.serialize_str(&format!("{} else {}", s1, s2))
            }
        }
    }
}

impl Serialize for SwitchStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("SwitchStatement", 2)?;
        state.serialize_field("head", &self.head)?;
        state.serialize_field("body", &self.body)?;
        state.end()
    }
}

impl Serialize for CaseLabel {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            CaseLabel::Case(ref e) => serializer.serialize_str(&format!("case {}:", e)),
            CaseLabel::Def => serializer.serialize_str("default:"),
        }
    }
}

impl Serialize for IterationStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            IterationStatement::While(ref c, ref s) => {
                serializer.serialize_str(&format!("while ({}) {}", c, s))
            }
            IterationStatement::DoWhile(ref s, ref e) => {
                serializer.serialize_str(&format!("do {} while ({});", s, e))
            }
            IterationStatement::For(ref init, ref rest, ref body) => serializer.serialize_str(
                &format!(
                    "for ({}; {}; {}) {}",
                    init,
                    rest.condition.as_ref().map_or("".to_owned(), |c| format!("{}", c)),
                    rest.post_expr.as_ref().map_or("".to_owned(), |e| format!("{}", e)),
                    body
                )
            ),
        }
    }
}

impl Serialize for ForInitStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            ForInitStatement::Expression(ref e) => {
                e.as_ref().map_or(Ok("".to_owned()), |e| {
                    serializer.serialize_str(&format!("{}", e))
                })
            }
            ForInitStatement::Declaration(ref d) => d.serialize(serializer),
        }
    }
}

impl Serialize for ForRestStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        use serde::ser::SerializeStruct;

        let mut state = serializer.serialize_struct("ForRestStatement", 2)?;
        state.serialize_field("condition", &self.condition)?;
        state.serialize_field("post_expr", &self.post_expr)?;
        state.end()
    }
}

impl Serialize for JumpStatement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            JumpStatement::Continue => serializer.serialize_str("continue;"),
            JumpStatement::Break => serializer.serialize_str("break;"),
            JumpStatement::Return(Some(ref e)) => serializer.serialize_str(&format!("return {};", e)),
            JumpStatement::Return(None) => serializer.serialize_str("return;"),
            JumpStatement::Discard => serializer.serialize_str("discard;"),
        }
    }
}

impl Serialize for Preprocessor {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            Preprocessor::Define(ref d) => d.serialize(serializer),
            Preprocessor::Else => serializer.serialize_str("#else"),
            Preprocessor::ElIf(ref elif) => elif.serialize(serializer),
            Preprocessor::EndIf => serializer.serialize_str("#endif"),
            Preprocessor::Error(ref err) => err.serialize(serializer),
            Preprocessor::If(ref i) => i.serialize(serializer),
            Preprocessor::IfDef(ref def) => def.serialize(serializer),
            Preprocessor::IfNDef(ref ndef) => ndef.serialize(serializer),
            Preprocessor::Include(ref inc) => inc.serialize(serializer),
            Preprocessor::Line(ref l) => l.serialize(serializer),
            Preprocessor::Pragma(ref p) => p.serialize(serializer),
            Preprocessor::Undef(ref u) => u.serialize(serializer),
            Preprocessor::Version(ref v) => v.serialize(serializer),
            Preprocessor::Extension(ref e) => e.serialize(serializer),
        }
    }
}

impl Serialize for PreprocessorDefine {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            PreprocessorDefine::ObjectLike {
                ref ident,
                ref value,
            } => serializer.serialize_str(&format!("#define {} {}", ident, value)),

            PreprocessorDefine::FunctionLike {
                ref ident,
                ref args,
                ref value,
            } => serializer.serialize_str(&format!(
                "#define {}({}) {}",
                ident,
                args.join(", "),
                value
            )),
        }
    }
}

impl Serialize for PreprocessorElIf {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#elif {}", self.condition))
    }
}

impl Serialize for PreprocessorError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#error {}", self.message))
    }
}

impl Serialize for PreprocessorIf {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#if {}", self.condition))
    }
}

impl Serialize for PreprocessorIfDef {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#ifdef {}", self.ident))
    }
}

impl Serialize for PreprocessorIfNDef {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#ifndef {}", self.ident))
    }
}

impl Serialize for PreprocessorInclude {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#include {}", self.path))
    }
}

impl Serialize for PreprocessorLine {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        if let Some(ref ssn) = self.source_string_number {
            serializer.serialize_str(&format!("#line {} {}", self.line, ssn))
        } else {
            serializer.serialize_str(&format!("#line {}", self.line))
        }
    }
}

impl Serialize for PreprocessorPragma {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#pragma {}", self.command))
    }
}

impl Serialize for PreprocessorUndef {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("#undef {}", self.name))
    }
}

impl Serialize for PreprocessorVersion {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        if let Some(ref profile) = self.profile {
            serializer.serialize_str(&format!("#version {} {}", self.version, profile))
        } else {
            serializer.serialize_str(&format!("#version {}", self.version))
        }
    }
}

impl Serialize for PreprocessorVersionProfile {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            PreprocessorVersionProfile::Core => serializer.serialize_str("core"),
            PreprocessorVersionProfile::Compatibility => serializer.serialize_str("compatibility"),
            PreprocessorVersionProfile::ES => serializer.serialize_str("es"),
        }
    }
}

impl Serialize for PreprocessorExtension {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        if let Some(ref behavior) = self.behavior {
            serializer
                .serialize_str(&format!("#extension {} : {}", self.name, behavior))
        } else {
            serializer.serialize_str(&format!("#extension {}", self.name))
        }
    }
}

impl Serialize for PreprocessorExtensionName {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            PreprocessorExtensionName::All => serializer.serialize_str("all"),
            PreprocessorExtensionName::Specific(ref s) => serializer.serialize_str(s),
        }
    }
}

impl Serialize for PreprocessorExtensionBehavior {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        match *self {
            PreprocessorExtensionBehavior::Require => serializer.serialize_str("require"),
            PreprocessorExtensionBehavior::Enable => serializer.serialize_str("enable"),
            PreprocessorExtensionBehavior::Warn => serializer.serialize_str("warn"),
            PreprocessorExtensionBehavior::Disable => serializer.serialize_str("disable"),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_serialize_shader_stage() {
        let shader = ShaderStage(NonEmpty(vec![
            ExternalDeclaration::Preprocessor(Preprocessor::Version(PreprocessorVersion {
                version: 100,
                profile: Some(PreprocessorVersionProfile::ES),
            })),
            ExternalDeclaration::FunctionDefinition(FunctionDefinition {
                prototype: FunctionPrototype {
                    ty: FullySpecifiedType {
                        qualifier: None,
                        ty: TypeSpecifier {
                            ty: TypeSpecifierNonArray::Void,
                            array_specifier: None,
                        },
                    },
                    name: Identifier("main".to_string()),
                    parameters: vec![],
                },
                statement: CompoundStatement {
                    statement_list: vec![Statement::Simple(Box::new(
                        SimpleStatement::Expression(Some(Expr::IntConst(42))),
                    ))],
                },
            }),
        ]));

        let json = serde_json::to_string(&shader).unwrap();

        assert_eq!(
            json,
            r#"[{"Preprocessor": {"Version": {"version": 100, "profile": "es"}}}, {"FunctionDefinition": {"prototype": {"ty": {"qualifier": null, "ty": {"ty": "void", "array_specifier": null}}, "name": "main", "parameters": []}, "statement": {"statement_list": [{"Expression": "42;"}]}}}]"#
        );
    }
}
