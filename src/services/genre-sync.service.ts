import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';
import {rabbitmqSubscribe} from '../decorators';
import {CategoryRepository, GenreRepository} from '../repositories';
import {BaseModelSyncService} from './base-model-sync.service';
import {ValidatorService} from './validator.service';

@bind({scope: BindingScope.SINGLETON})
export class GenreSyncService extends BaseModelSyncService {
  constructor(
    @repository(GenreRepository) private repo: GenreRepository,
    @repository(CategoryRepository) private categoryRepo: CategoryRepository,
    @service(ValidatorService) private validator: ValidatorService,
  ) {
    super(validator);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/genre',
    routingKey: 'model.genre.*',
    queueOptions: {
      deadLetterExchange: 'dlx.amq.topic',
    },
  })
  async handler({data, message}: {data: any; message: Message}) {
    await this.sync({repo: this.repo, data, message});
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/genre_categories',
    routingKey: 'model.genre_categories.*',
    queueOptions: {
      deadLetterExchange: 'dlx.amq.topic',
    },
  })
  async handlerCategories({data, message}: {data: any; message: Message}) {
    await this.syncRelation({
      id: data.id,
      relationName: 'categories',
      relationIds: data.relation_ids,
      relationRepo: this.categoryRepo,
      repo: this.repo,
      message,
    });
  }
}
