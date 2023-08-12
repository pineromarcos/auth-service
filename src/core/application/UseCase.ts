export interface UseCase<INPUT extends unknown[] | unknown, OUTPUT> {
  run (...input: INPUT extends unknown[] ? INPUT : [INPUT]): Promise<OUTPUT>
}
