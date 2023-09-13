import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPlants = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Plants, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly owner?: string | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Plants = LazyLoading extends LazyLoadingDisabled ? EagerPlants : LazyPlants

export declare const Plants: (new (init: ModelInit<Plants>) => Plants) & {
  copyOf(source: Plants, mutator: (draft: MutableModel<Plants>) => MutableModel<Plants> | void): Plants;
}