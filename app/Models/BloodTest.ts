import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import Pacient from 'App/Models/Pacient'

export default class BloodTest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pacientId: Pacient

  @column()
  public sugar: number

  @column()
  public oxigen: number

  @column()
  public bodyfat: number

  @column()
  public result: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Pacient)
  public Pacient: BelongsTo<typeof Pacient>
}
