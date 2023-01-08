import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiException = (...Exceptions: any[]) => {
  const maps = Exceptions.reduce<Record<number, string[]>>((maps, Exception) => {
    const name = Exception.name;
    const status = new Exception().getStatus();

    if (maps[status]) {
      maps[status].push(name);
    } else {
      maps[status] = [name];
    }

    return maps;
  }, {});

  return applyDecorators(
    ...Object.entries(maps).map(([status, names]) =>
      ApiResponse({
        status: parseInt(status),
        description: names.join('<br>').replace('Exception', ''),
      }),
    ),
  );
};
