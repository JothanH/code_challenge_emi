export function convertData<T>(dataArray: any[]): T[] {
  return dataArray.map( data => {
    return {
      ...data
    };
  }) as T[];
}
