import {Binding, Component, CoreBindings, inject} from '@loopback/core';
import {UpdateCategoryRelationObserver} from '../observers/update-category-relation.observer';

export class EntityComponent implements Component {
  lifeCycleObservers = [UpdateCategoryRelationObserver];
}
