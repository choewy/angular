import { DateTime } from 'luxon';
import { Column, ColumnOptions, FindOperator, ValueTransformer } from 'typeorm';

class DateTimeColumnTransformer implements ValueTransformer {
  to(value: DateTime | FindOperator<DateTime> | null): string | FindOperator<DateTime> | null {
    if (value instanceof FindOperator) {
      return value;
    } else if (value == null) {
      return null;
    }

    return value.toSQL({ includeOffset: false });
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}

export const DateTimeColumn = (options: ColumnOptions = {}) => {
  return Column({
    type: 'datetime',
    transformer: new DateTimeColumnTransformer(),
    ...options,
  });
};
