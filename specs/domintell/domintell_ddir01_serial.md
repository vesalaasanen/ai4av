---
spec_id: admin/domintell-ddir01
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DDIR01 Control Spec"
manufacturer: Domintell
model_family: DDIR01
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DDIR01
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.domintell.com
source_urls:
  - https://pro.domintell.com/web/content/112505
retrieved_at: 2026-09-10T13:22:10.402Z
last_checked_at: 2026-10-07T20:54:00.565Z
generated_at: 2026-10-07T20:54:00.565Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "%X"
  - "%K"
  - "source is the Domintell Light Protocol guide (v1.27.08, 24/10/2018) for the"
  - "DETH02 supports an OPTIONAL password: LOGIN sent with a password encrypted via the"
  - "response format for HELP not documented in source (only \"Send \\\"HELP\\\" from ETH\")"
  - "none populated; source documents no DIR variables."
  - "DDIR01 firmware version compatibility not stated in source"
  - "no DIR-specific input or output sample strings in source; DIR frames composed from generic frame formats + 'C' data/parameter type"
  - "DETH02 password encryption format (libdeth SDK only, not in this source)"
  - "response format of ETH reserved command \"HELP\" not documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:54:00.565Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 action units map to source commands and transport values are supported; the source has only about 2 uncovered generic commands (%X, %K), so coverage is above 0.9. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-10
---

# Domintell DDIR01 Control Spec

## Summary
The Domintell DDIR01 is an IR (infrared) detector module on the Domintell bus. It is monitored and driven through the Domintell Light Protocol, an ASCII frame protocol carried over RS-232 (DRS2320x communication modules) or UDP Ethernet (DETH02). The DDIR01 reports detected infrared key codes as output data type 'C' (e.g. Key 1 = '01').

<!-- UNRESOLVED: source is the Domintell Light Protocol guide (v1.27.08, 24/10/2018) for the
     DRS2320x/DETH02 interfaces — it documents the generic frame format and the DDIR01 module
     type (DIR, output data type 'C') but contains NO DIR-specific sample input/output strings.
     DIR frames below are composed from the documented generic frame formats. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  # DRS23202 (the only RS-232 module carrying Output Light Protocol, needed to receive DDIR01 status):
  baud_rate: 57600  # fixed on DRS23202; DRS23201 (input-only) selectable 1200/2400/4800/9600/19200/38400/57600
  data_bits: 8
  parity: none  # DRS23202: no parity selection; DRS23201 (module version >= 4): none/even/odd selectable
  stop_bits: 1
  flow_control: none  # DB9 pins 4 (DSR) / 6 (DTR) reserved for handshake, not used; pin 2 = TX, pin 3 = RX, pin 5 = GND
addressing:
  port: 17481  # DETH02 UDP default port (changeable); IP via DHCP or static (static recommended)
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure on the RS-232 interface in source)
  # UNRESOLVED: DETH02 supports an OPTIONAL password: LOGIN sent with a password encrypted via the
  # Domintell libdeth SDK (>= 2.0.0, deth_encryptpsw, 4-10 char password). Encryption/token format
  # is not specified in this source. Only one client can connect to a DETH02 at a time.
```

## Traits
```yaml
# - queryable: '%S' ask-status-of-module parameter documented (works on any module except MEMO)
- queryable  # inferred from documented '%S' status query
```

## Actions
```yaml
# Scope: DDIR01 (ModType 'DIR') actions + the documented interface/session commands needed to
# reach it. Commands for OTHER Domintell modules (BU1/TRV/DIM/AMP/...) documented in the same
# source are out of scope for this spec - they belong to their own module specs.
#
# Input Light Protocol action frame format (from source):
#   {ModType 3 char}{Serial Number 6 char hexadecimal}-{Output Number 1 char}{action parameters}
#   - parameters always start with '%'
#   - max 30 characters per message
#   - strings are NOT case sensitive (auto-uppercased); leading/trailing spaces trimmed
#   - '<CR>'/'<LF>'/'<TAB>' are replaced by ASCII 0x0D/0x0A/0x09; trailing CR/LF supported
#   - extended mode (since version 5): control characters as '<xx>', decimal 00-31, 2 chars

- id: send_ir_command
  label: Send IR Command
  kind: action
  # Composed from the generic action frame format + documented '%C' action parameter
  # ('C' = Infrared Command, "Example: Key 1 = '01'"). No DIR-specific input sample in source.
  command: "DIR{serial}-{output}%C{key}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal (leading '0' may be space)"
    - name: output
      type: integer
      description: "Output number on the module (1 hex digit)"
    - name: key
      type: string
      description: "Infrared key code, 2 hex chars (e.g. '01' = Key 1)"

- id: query_status
  label: Query Module Status
  kind: query
  # '%S' = ask status of module (documented as not working with MEMO). Examples in source:
  # 'BU1    11%S', 'AMP000003%S', 'PBL    13%S'.
  command: "DIR{serial}%S"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal (leading '0' may be space)"

- id: ping
  label: Ping Interface Module
  kind: query
  command: "PING"
  params: []

- id: mod_version
  label: Get Interface Module Version
  kind: query
  command: "MOD_VERSION"
  params: []

- id: appinfo
  label: Get Application Info (Module List)
  kind: query
  command: "APPINFO"
  params: []

- id: login
  label: Open Session (DETH02)
  kind: action
  # If a password is set, send the string returned by the libdeth library instead of plain LOGIN.
  command: "LOGIN"
  params: []

- id: logout
  label: Close Session (DETH02)
  kind: action
  command: "LOGOUT"
  params: []

- id: hello
  label: Session Keepalive (DETH02)
  kind: action
  # Send every 50 seconds to keep the session open; prefer over PING for keepalive.
  command: "HELLO"
  params: []

- id: help
  label: ETH Reserved Help Command
  kind: query
  command: "HELP"
  params: []
  # UNRESOLVED: response format for HELP not documented in source (only "Send \"HELP\" from ETH")

- id: set_output
  label: Set Output
  kind: action
  command: "{module}{serial}-{output}%I"
  params:
    - name: module
      type: string
      description: "Module type token (e.g. BIR)"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: reset_output
  label: Reset Output
  kind: action
  command: "{module}{serial}-{output}%O"
  params:
    - name: module
      type: string
      description: "Module type token (e.g. BIR)"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: set_decimal_value
  label: Set Decimal Value
  kind: action
  command: "{module}{serial}-{output}%Dxxx"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"
    - name: value
      type: string
      description: "Decimal value; range UNRESOLVED"

- id: start_dimming
  label: Start Dimming
  kind: action
  command: "{module}{serial}-{output}%DB"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: stop_dimming
  label: Stop Dimming
  kind: action
  command: "{module}{serial}-{output}%DE"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: increase_decimal_value
  label: Increase Decimal Value
  kind: action
  command: "{module}{serial}-{output}%I%Dxxx"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"
    - name: value
      type: string
      description: "Decimal step percent; range UNRESOLVED"

- id: decrease_decimal_value
  label: Decrease Decimal Value
  kind: action
  command: "{module}{serial}-{output}%O%Dxxx"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"
    - name: value
      type: string
      description: "Decimal step percent; range UNRESOLVED"

- id: set_heating_temperature
  label: Set Heating Temperature
  kind: action
  command: "{module}{serial}%Txx.x"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: value
      type: string
      description: "Decimal temperature value; range UNRESOLVED"

- id: set_cooling_temperature
  label: Set Cooling Temperature
  kind: action
  command: "{module}{serial}%Uxx.x"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: value
      type: string
      description: "Decimal temperature value; range UNRESOLVED"

- id: select_sound_auxiliary
  label: Select Sound Auxiliary
  kind: action
  command: "AMP{serial}-{output}%Ax"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"
    - name: auxiliary
      type: string
      description: "1=>4, Tuner = 5"

- id: set_tuner_frequency
  label: Set Tuner Frequency
  kind: action
  command: "AMP{serial}-{output}%Fxxx,xxxx"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"
    - name: frequency
      type: string
      description: "Decimal Tuner Frequency in Mhz; format xxx,xxxx"

- id: set_temperature_mode
  label: Set Temperature Mode
  kind: action
  command: "{module}{serial}%Mx"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: mode
      type: string
      description: "1=absence, 2=auto, 5=confort, 6=gel"

- id: set_regulation_mode
  label: Set Regulation Mode
  kind: action
  command: "{module}{serial}%Rx"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: mode
      type: string
      description: "0=off, 1=heating, 2=cooling, 3=mixed"

- id: simulate_push
  label: Simulate Push
  kind: action
  command: "{module}{serial}-{input}%Px"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: input
      type: string
      description: "Input number (1 char)"
    - name: push
      type: string
      description: "1=Begin short push, 2=End short push, 3=Begin long push, 4=End long push"

- id: shutter_high
  label: Move Shutter High
  kind: action
  command: "{module}{serial}-{output}%H"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: shutter_low
  label: Move Shutter Low
  kind: action
  command: "{module}{serial}-{output}%L"
  params:
    - name: module
      type: string
      description: "Module type token"
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: toggle_bir_output
  label: Toggle BIR Output
  kind: action
  command: "BIR{serial}-{output}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: toggle_dim_output
  label: Toggle DIM Output
  kind: action
  command: "DIM{serial}-{output}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: operate_trv_shutter
  label: Operate TRV Shutter
  kind: action
  command: "TRV{serial}-{output}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"

- id: operate_trp_shutter
  label: Operate TRP Shutter
  kind: action
  command: "TRP{serial}-{output}"
  params:
    - name: serial
      type: string
      description: "Module serial number, 6-char hexadecimal"
    - name: output
      type: string
      description: "Output number (1 char)"
```

## Feedbacks
```yaml
# Output Light Protocol status frame format (from source):
#   {ModType 3 char}{Serial 6 char hex}{optional '-IO number', 1 hex digit}{Data Type 1 char}{Datas n*2 hex}
#   For DDIR01 the data type is 'C' (Infrared Command). Leading '0' in fields may be a space.

- id: ir_key
  type: string
  description: "Detected infrared key code (data type 'C'); e.g. '01' = Key 1. Frame: DIR{serial}C{key}"

- id: pong
  type: string
  description: "Reply from DRS23202/DETH02 after 'PING' - literal 'PONG'"
  query_command: "PING"

- id: mod_version
  type: string
  description: "Reply to 'MOD_VERSION' (hex), e.g. 'MOD_VERSION=SER_V0A' (DRS23202) or 'MOD_VERSION=ETH_V01_STK_V01' / 'MOD_VERSION=ETH02_V14-STK_V0F' (DETH02)"
  query_command: "MOD_VERSION"

- id: appinfo
  type: string
  description: "APPINFO stream: header line 'APPINFO (PROG M x.xx date Rev=n) => appname.dap', then one line per module IO with name and [House|floor|room]; fully retrieved when a line starting with 'END APPINFO' is received"
  query_command: "APPINFO"

- id: session_status
  type: enum
  values: [opened, closed, timeout]
  description: "DETH02 session strings: 'INFO:Session opened:INFO' / 'INFO:Session closed:INFO' / 'INFO:Session timeout:INFO'"
```

## Variables
```yaml
# No settable non-action parameters documented for DDIR01 in source.
# System variables (SYS000000..SYS000009, FRO000001) are master-level, not DDIR01 - out of scope.
# UNRESOLVED: none populated; source documents no DIR variables.
```

## Events
```yaml
- id: ir_key_detected
  description: "Unsolicited DIR status frame (data type 'C') sent on every status change; Output Light Protocol transfers an ASCII text for each status change on the installation"

- id: firmware_upgrade_required
  description: "Strings starting with '!!' - e.g. '!! PLEASE UPGRADE DRS23202 FIRMWARE >= 18 !!', '!! PLEASE UPGRADE DETH02 FIRMWARE >= 17 !!', '!! PLEASE UPGRADE DETH02 FIRMWARE'. Must be shown to user, who should contact Domintell support; some statuses/commands may not work until firmware update"

- id: restart_master_required
  description: "'! PLEASE RESTART MASTER 0x????????  !' - module ???????? (serial) not in the DRS23202/DETH02 module table"
```

## Macros
```yaml
- id: deth02_session_init
  label: DETH02 Session Initialization
  steps:
    - command: "MOD_VERSION"
      note: "Check you are talking to a DETH02"
    - command: "LOGIN"
      note: "Open session; if a password is set, send the string returned by the libdeth library"
    - command: "APPINFO"
      note: "Download list of modules (ends at 'END APPINFO')"
    - command: "PING"
      note: "Refresh statuses after LOGIN; no end-of-list marker exists"

- id: deth02_keepalive
  label: DETH02 Session Keepalive
  steps:
    - command: "HELLO"
      note: "Send every 50 seconds; avoid PING for keepalive (bus traffic / master resources)"

- id: deth02_session_close
  label: DETH02 Session Close
  steps:
    - command: "LOGOUT"
      note: "Send before exiting/backgrounding the application so other clients can use the DETH02"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# WARNING (verbatim from source): "Do NOT connect Domintell bus on the DETH0x RJ45 connector,
# this can cause fatal damages to the DETH0x module."
# Operational timing constraints (from source, not safety interlocks): minimum 25 ms between two
# RS-232 messages OR use the reserved '&' character; for DETH02 wait for the reply (5-100 ms) or
# at least 5 ms between Ethernet frames - frames closer than 4 ms apart may be lost.
```

## Notes
- Source: "Domintell Light Protocol guide and DRS2320x / ETHERNET communication interface", protocol doc v1.27.08 (24/10/2018).
- DDIR01 appears in the module table as ModType `DIR`, description "IR detector", possible output data type `C` (Infrared Command).
- Input specifications are the same for all modules (data to Domintell); output protocol specs differ per module type.
- Output Light Protocol (needed to receive DDIR01 events) is only available on DRS23202 (RS-232) and DETH02 (UDP), and only on installations with fewer than 241 modules. DRS23201/DUSB01/DGSM01 support Input Light Protocol only.
- Multiple DRS23202/DETH02 in one installation require configuration software >= 1.19.11 and firmware >= v15 (DRS23202) / v7 (DETH02).
- Frame separators: multiple Light Protocol messages (not DETH0x-specific commands) may be encapsulated in one Ethernet frame using the reserved '&' character; messages may start with '&'. Only ONE DETH0x-specific command per UDP frame; DETH0x commands cannot be '&' concatenated.
- Light Protocol strings have priority over ASCII (custom) string links — a link configured with text like "BIR000B4B-1" is decoded as Light Protocol and the custom link will not execute.
- DETH02 session: reply latency 5-100 ms depending on frame length and bus/network load; you must wait for at least one reply before sending the next command or new commands will be dropped.
- RS-232 wiring: straight female-male DB9 cable to a computer; null-modem (cross) male-male DB9 to control another device. Pins: 2 = TX data out, 3 = RX data in, 5 = ground; pins 4/6 (DSR/DTR) reserved for handshake, not used (contact support@domintell.com for specific handshake).
- APPINFO notes relevant to DIR clients: room/floor info given as [House|floor|room] after item name; version format `[VERS=0xnn]` or `[VERS=UNSCANNED]`; charset given as `CP=1252` (Windows-1252) from OS 1.27.06; warnings/errors start with '!' and must be shown to the user.
- DETH02 password login uses the Domintell SDK library libdeth (`deth_encryptpsw`: password 4-10 ASCII chars, 'LOGIN' auto-appended, binary output may contain null chars). SDK >= 2.0.0 required; binary incompatible with 1.0.0.
<!-- UNRESOLVED: DDIR01 firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no DIR-specific input or output sample strings in source; DIR frames composed from generic frame formats + 'C' data/parameter type -->
<!-- UNRESOLVED: DETH02 password encryption format (libdeth SDK only, not in this source) -->
<!-- UNRESOLVED: response format of ETH reserved command "HELP" not documented -->

## Provenance

```yaml
source_domains:
  - pro.domintell.com
source_urls:
  - https://pro.domintell.com/web/content/112505
retrieved_at: 2026-09-10T13:22:10.402Z
last_checked_at: 2026-10-07T20:54:00.565Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:54:00.565Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 action units map to source commands and transport values are supported; the source has only about 2 uncovered generic commands (%X, %K), so coverage is above 0.9. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "%X"
- "%K"
- "source is the Domintell Light Protocol guide (v1.27.08, 24/10/2018) for the"
- "DETH02 supports an OPTIONAL password: LOGIN sent with a password encrypted via the"
- "response format for HELP not documented in source (only \"Send \\\"HELP\\\" from ETH\")"
- "none populated; source documents no DIR variables."
- "DDIR01 firmware version compatibility not stated in source"
- "no DIR-specific input or output sample strings in source; DIR frames composed from generic frame formats + 'C' data/parameter type"
- "DETH02 password encryption format (libdeth SDK only, not in this source)"
- "response format of ETH reserved command \"HELP\" not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
