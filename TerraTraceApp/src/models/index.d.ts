import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerS3Object = {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
}

type LazyS3Object = {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
}

export declare type S3Object = LazyLoading extends LazyLoadingDisabled ? EagerS3Object : LazyS3Object

export declare const S3Object: (new (init: ModelInit<S3Object>) => S3Object)

type EagerPlants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plants, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly owner?: string | null;
  readonly file?: S3Object | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plants, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly owner?: string | null;
  readonly file?: S3Object | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plants = LazyLoading extends LazyLoadingDisabled ? EagerPlants : LazyPlants

export declare const Plants: (new (init: ModelInit<Plants>) => Plants) & {
  copyOf(source: Plants, mutator: (draft: MutableModel<Plants>) => MutableModel<Plants> | void): Plants;
}