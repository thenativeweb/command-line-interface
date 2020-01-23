# command-line-interface

$ docker --verbose containers ls -a
  |_______________|__________|_____|
       docker  ->  containers->ls

docker

options:
  - verbose | boolean (=false)

subcommands:
  - containers

    options:

    subcommands:
      - ls

        options:
          - a/all | boolean (=false)
          - q/quiet | boolean (=false)

      - rm

        options:
          - n/name | string

      - stop

        options:
          - t/time | number (=10)
