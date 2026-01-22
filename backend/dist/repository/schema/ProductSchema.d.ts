import { Schema } from "mongoose";
export declare const ProductModel: import("mongoose").Model<{
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        name: string;
        description: string;
        price: number;
        imageKey: string;
        owner: string;
        likes?: string[] | null;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        name: string;
        description: string;
        price: number;
        imageKey: string;
        owner: string;
        likes?: string[] | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    description: string;
    price: number;
    imageKey: string;
    owner: string;
    likes?: string[] | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=ProductSchema.d.ts.map