import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }

  async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options);
  }

  async update(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  async delete(
    filter: QueryFilter<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOneAndDelete(filter,  options);
  }
}