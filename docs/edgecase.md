Not supported with `*` symbol

According to the [conventions](/conventions), when the route contains *, the file name is also *. ts, but the toolchain does not support * file names. There are two alternative solutions:

1. Change to a named routing parameter: name,

2. Manually register routes