---
spec_id: admin/domintell-daxmov04-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell Daxmov04 W Control Spec"
manufacturer: Domintell
model_family: "Daxmov04 W"
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - "Daxmov04 W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.mydomintell.com
source_urls:
  - https://pro.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_27_08.pdf
retrieved_at: 2026-08-15T13:45:51.682Z
last_checked_at: 2026-10-07T13:31:53.719Z
generated_at: 2026-10-07T13:31:53.719Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-10-07T13:31:53.719Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 units match the generic Light Protocol guide and transport supported; source never names Daxmov04 W, so applicability is generic."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# Domintell Daxmov04 W Control Spec

## Summary
This spec records the generic Domintell Light Protocol commands documented for DRS23202 and DETH02 communication interfaces. The source does not describe the Daxmov04 W itself or establish that its behavior matches the cited shutter module examples. Daxmov04 W command applicability and module-specific behavior are UNRESOLVED.

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
addressing:
  port: 17481
  transport: udp
  ip_assignment: dhcp_or_static
auth:
  type: optional
  password:
    min_length: 4
    max_length: 10
    encoding: "ASCII; encrypt with libdeth deth_encryptpsw; LOGIN is appended automatically before encryption"
```

Notes on transport:
- The serial settings are documented for the DRS23202 interface: fixed 57600 baud, 8 data bits, no parity, and 1 stop bit. They describe the gateway interface, not the Daxmov04 W.
- DETH02 uses UDP. Its default port is 17481 and can be changed. Its IP can use DHCP or be static; the source highly recommends a static IP.
- DETH02 can be password protected, and only one client can connect at a time. The source documents password encryption through `deth_encryptpsw`; it does not specify a plaintext in-band password procedure.
- The source does not specify serial flow control.

## Traits
```yaml
- routable  # Generic Light Protocol supports addressed module commands; Daxmov04 W applicability is UNRESOLVED.
- levelable  # Generic Light Protocol supports dimmer/volume level commands; Daxmov04 W applicability is UNRESOLVED.
- queryable  # Generic Light Protocol documents %S status queries and output status frames; Daxmov04 W applicability is UNRESOLVED.
```

## Actions
```yaml
# Generic input Light Protocol frame format from source §3.3c:
# <Mod Type:3><Serial:6 hexadecimal characters>-<Output:1 hexadecimal character><Action parameters>
# The serial field may replace leading zeroes with spaces. Source samples show this padding,
# for example "TRV    73-1%H". Leading and trailing spaces in a message are trimmed.
# The Daxmov04 W Mod Type and supported output numbers are UNRESOLVED.

- id: shutter_cycle_step
  label: Shutter cycle step (UP-STOP-DOWN-STOP repeat)
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}"
  notes: "For the documented DTRV01 example, each send runs one step of UP-STOP-DOWN-STOP-UP-… . Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
      description: "3-character module type. Daxmov04 W type is UNRESOLVED."
    - name: SERIAL
      type: string
      description: "6-character hexadecimal serial field; leading zeroes may be replaced by spaces."
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: shutter_up
  label: Shutter goes High (UP)
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%H"
  notes: "Source also documents %I as an UP command for the paired shutter output. DTRV01 example: shutter 1 uses output 1 or 2; status can be TRV    73O01 if no other shutter is ON (since v1.19.17). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
      description: "3-character module type. Daxmov04 W type is UNRESOLVED."
    - name: SERIAL
      type: string
      description: "6-character hexadecimal serial field; leading zeroes may be replaced by spaces."
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: shutter_down
  label: Shutter goes Low (DOWN)
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%L"
  notes: "Source also documents %I as a DOWN command for the paired shutter output. DTRV01 example: shutter 1 uses output 1 or 2; status can be TRV    73O02 if no other shutter is ON (since v1.19.17). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
      description: "3-character module type. Daxmov04 W type is UNRESOLVED."
    - name: SERIAL
      type: string
      description: "6-character hexadecimal serial field; leading zeroes may be replaced by spaces."
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: shutter_stop
  label: Stop shutter
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%O"
  notes: "The source shows %O stopping a DTRV01 shutter. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string

- id: ask_status
  label: Ask status of module
  kind: query
  command: "{MOD_TYPE}{SERIAL}%S"
  notes: "Source: %S asks for module status and does not work with MEMO. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string

- id: mod_version_query
  label: Query gateway module version (DETH02 / DRS23202)
  kind: query
  command: "MOD_VERSION"
  notes: "Source §4.2a. Reply examples include MOD_VERSION=ETH02_V14-STK_V0F (DETH02) and MOD_VERSION=SER_V0A (DRS23202)."

- id: login_open_session
  label: Open a session (ETH)
  kind: action
  command: "LOGIN"
  notes: "Source §4.2a. Reply: INFO:Session opened:INFO. If a password is set, use the encrypted login string returned by libdeth as described in §4.3."

- id: login_with_password
  label: Open a session with password (ETH)
  kind: action
  command: "{ENCRYPTED_LOGIN}"
  notes: "Send the string returned by libdeth deth_encryptpsw. The SDK automatically appends LOGIN to the password before encryption, so the returned bytes already contain the login command. Password must be null-terminated ASCII, 4–10 characters excluding the null terminator. The result may contain null bytes; use its returned byte length when copying or sending it."
  params:
    - name: ENCRYPTED_LOGIN
      type: string
      description: "Raw bytes and byte length returned by deth_encryptpsw; may contain null bytes."

- id: logout_close_session
  label: Close session
  kind: action
  command: "LOGOUT"
  notes: "Source §4.2e. Reply: INFO:Session closed:INFO. Allows other clients to use DETH02."

- id: hello_keepalive
  label: Keep session alive
  kind: action
  command: "HELLO"
  notes: "Source §4.2c recommends sending every 50 seconds to keep the session open. Reply: INFO:World:INFO. Avoid PING for keepalive because it adds Domintell bus traffic and uses master resources."

- id: ping_refresh_statuses
  label: Refresh all statuses
  kind: action
  command: "PING"
  notes: "Source §4.2d. Generally use after LOGIN when the application has already been configured using APPINFO. There is no end-of-list marker for returned statuses."

- id: appinfo_dump
  label: Dump module inventory
  kind: query
  command: "APPINFO"
  notes: "Source §4.2b. The response is complete when a line beginning END APPINFO is received. The sample then gives Datasheet @ www.domintell.com => Pro - support@domintell.com on a separate line. APPINFO may include firmware warnings."

- id: help
  label: Request help
  kind: query
  command: "HELP"
  notes: "The source's APPINFO end line says: Send HELP from ETH."

- id: set_dimmer_or_volume
  label: Set dimmer or volume value
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%Dxxx"
  notes: "Source: %Dxxx decimal dimmer/volume value assignment. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
      description: "3-character module type. Daxmov04 W type is UNRESOLVED."
    - name: SERIAL
      type: string
      description: "6-character hexadecimal serial field; leading zeroes may be replaced by spaces."
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."
    - name: VALUE
      type: string
      description: "Decimal dimmer/volume value; range UNRESOLVED."

- id: start_dim
  label: Start dimming
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%DB"
  notes: "Source: %DB executes a Start/Stop dim on a dimmer output. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: stop_dim
  label: Stop dimming
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%DE"
  notes: "Source: %DE executes a Start/Stop dim on a dimmer output. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: increase_dimmer_or_volume
  label: Increase dimmer or volume value
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%I%Dxxx"
  notes: "Source: %I%Dxxx increases dimmer/volume value by step of decimal xxx percent. Examples stop at 100%. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."
    - name: STEP
      type: string
      description: "Decimal percent step; stop at 100%."

- id: decrease_dimmer_or_volume
  label: Decrease dimmer or volume value
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%O%Dxxx"
  notes: "Source: %O%Dxxx decreases dimmer/volume value by step of decimal xxx percent. Examples stop at 0%. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."
    - name: STEP
      type: string
      description: "Decimal percent step; stop at 0%."

- id: set_heating_setpoint
  label: Set heating temperature setpoint
  kind: action
  command: "{MOD_TYPE}{SERIAL}%Txx.x"
  notes: "Source: %Txx.x sets a decimal T° value (set Heating setpoint). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: VALUE
      type: string
      description: "Decimal T° value in the source form xx.x; range UNRESOLVED."

- id: set_cooling_setpoint
  label: Set cooling temperature setpoint
  kind: action
  command: "{MOD_TYPE}{SERIAL}%Uxx.x"
  notes: "Source: %Uxx.x sets a decimal T° value (set Cooling setpoint). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: VALUE
      type: string
      description: "Decimal T° value in the source form xx.x; range UNRESOLVED."

- id: set_sound_auxiliary
  label: Set sound auxiliary selection
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%Ax"
  notes: "Source: %Ax Sound Auxiliary selection 1=>4, Tuner = 5. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
    - name: AUXILIARY
      type: string
      description: "1=>4, Tuner = 5"

- id: set_tuner_frequency
  label: Set tuner frequency
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%Fxxx,xxxx"
  notes: "Source: %Fxxx,xxxx decimal Tuner Frequency in Mhz. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
    - name: FREQUENCY
      type: string
      description: "Decimal tuner frequency in Mhz, source form xxx,xxxx; range UNRESOLVED."

- id: set_output
  label: Set output
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%I"
  notes: "Source: %I set the output. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: reset_output
  label: Reset output
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{OUTPUT}%O"
  notes: "Source: %O reset the output. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: OUTPUT
      type: string
      description: "1-character hexadecimal output number. Daxmov04 W valid output numbers are UNRESOLVED."

- id: set_temperature_mode
  label: Set temperature mode
  kind: action
  command: "{MOD_TYPE}{SERIAL}%Mx"
  notes: "Source: %Mx set Temperature mode (1=absence, 2=auto, 5=confort, 6=gel). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: MODE
      type: string
      description: "1=absence, 2=auto, 5=confort, 6=gel"

- id: set_regulation_mode
  label: Set regulation mode
  kind: action
  command: "{MOD_TYPE}{SERIAL}%Rx"
  notes: "Source: %Rx set Regulation mode (0=off, 1=heating, 2=cooling, 3=mixed). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: MODE
      type: string
      description: "0=off, 1=heating, 2=cooling, 3=mixed"

- id: simulate_input_push
  label: Simulate a push on an input
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{INPUT}%Px"
  notes: "Source: %Px simulate a push on an input (1=Begin short push, 2=End short push, 3=Begin long push, 4=End long push). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: INPUT
      type: string
      description: "1-character hexadecimal input number; valid input numbers UNRESOLVED."
    - name: PUSH
      type: string
      description: "1=Begin short push, 2=End short push, 3=Begin long push, 4=End long push"

- id: set_dmx_channel
  label: Set DMX channel value
  kind: action
  command: "{MOD_TYPE}{SERIAL}-{DEVICE}-{OUTPUT}%X{VALUE}"
  notes: "Source: %X DMX uses 2 bytes by channel; 'C0' = 192. Example: DMX    1F-2-1%X230 sets channel 1 of device 2. Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
      description: "3-character module type. Source example: DMX."
    - name: SERIAL
      type: string
      description: "6-character hexadecimal serial field; leading zeroes may be replaced by spaces."
    - name: DEVICE
      type: string
      description: "Device number; range UNRESOLVED."
    - name: OUTPUT
      type: string
      description: "Channel number; range UNRESOLVED."
    - name: VALUE
      type: string
      description: "2 bytes by channel; 'C0' = 192."

- id: set_clock
  label: Set clock
  kind: action
  command: "{MOD_TYPE}{SERIAL}%K"
  notes: "Source: %K Clocks. A clock string contains hh:mm:ss, day mask, name, and type of clock: blank(normal), SUNSET, SUNRISE, RESET. Source examples include day mask b0=sunday, b1=monday, ... b7= disable clock (=1). Daxmov04 W applicability is UNRESOLVED."
  params:
    - name: MOD_TYPE
      type: string
    - name: SERIAL
      type: string
    - name: TIME
      type: string
      description: "hh:mm:ss"
    - name: DAY_MASK
      type: string
      description: "b0=sunday, b1=monday, ... b7= disable clock (=1)"
    - name: NAME
      type: string
      description: "Clock name; range UNRESOLVED."
    - name: TYPE
      type: string
      description: "blank(normal), SUNSET, SUNRISE, RESET"
```

## Feedbacks
```yaml
# Generic output Light Protocol frame format from source §3.4a:
# <Mod Type:3><Serial:6 hexadecimal characters>(optional -<I/O number>)(DataType:1)(Data*)
# Data types include I/O (1-byte bitmask), D (2 bytes per output), X (2 bytes), T, U, C,
# S, B, P, and K. Source examples also show lowercase i in a received frame.

- id: pong
  label: PONG
  type: enum
  values: ["PONG"]
  notes: "Reply to PING. Source §3.4c."

- id: mod_version_string
  label: MOD_VERSION response
  type: string
  notes: "Examples: MOD_VERSION=SER_V0A (DRS23202), MOD_VERSION=ETH_V01_STK_V01 (DETH02, §3.4c), and MOD_VERSION=ETH02_V14-STK_V0F (DETH02, §4.2a). The source gives differing DETH02 example formats."

- id: info_status
  label: INFO status
  type: enum
  values: ["Session opened", "Session closed", "World", "Session timeout"]
  notes: "Source §4.2 examples: INFO:Session opened:INFO, INFO:Session closed:INFO, INFO:World:INFO, and INFO:Session timeout:INFO."

- id: appinfo_warning
  label: Firmware upgrade warning
  type: string
  notes: "Warning strings begin with exclamation marks. Source examples include !! PLEASE UPGRADE DRS23202 FIRMWARE >= 18 !! and !! PLEASE UPGRADE DETH02 FIRMWARE >= 17 !! in §3.4d, and >= 24 / >= 25 in an APPINFO example. The source also shows !! PLEASE UPGRADE DETH02 FIRMWARE without a threshold in §3.4c."

- id: appinfo_restart_master
  label: Restart master warning
  type: string
  notes: "Source format: ! PLEASE RESTART MASTER 0x???????? !. The source explains this can occur when the DRS23202/DETH02 was not on the bus when the master restarted or a module was added after the master scanned the bus."

- id: outputs_bitmask
  label: Output bitmask (DataType 'O')
  type: string
  query_command: "{MOD_TYPE}{SERIAL}%S"
  notes: "1-byte hexadecimal bitmask. LSB = output 0, MSB = output 7. Source examples: BU2    52O01 (output 1 ON) and TRV    73O00 (outputs OFF)."

- id: inputs_bitmask
  label: Input bitmask (DataType 'I')
  type: string
  query_command: "{MOD_TYPE}{SERIAL}%S"
  notes: "1-byte hexadecimal bitmask. LSB = input 0, MSB = input 7. Source examples: BU6    8AI10 (button 5 pressed) and IS4     7I00 (inputs OFF)."

- id: dimmer_percent
  label: Dimmer level (DataType 'D')
  type: string
  notes: "2 bytes per output, hexadecimal; 64 represents 100%. Source example: DIM   19FD 064 0 0 0 0 0 0 (dim 2 = 100%)."

- id: temperature_heating
  label: Heating temperature (DataType 'T')
  type: string
  notes: "Source format includes measure, setpoint, sensor mode, and profile. Example: TE1    6CT25.2 21.0 AUTO 19.5."

- id: temperature_cooling
  label: Cooling temperature (DataType 'U')
  type: string
  notes: "Source format includes measure, setpoint, regulation mode, and profile. Example: TE1    6CU25.2 21.0 HEATING 19.5."

- id: button_event
  label: Button event (DataType 'B')
  type: string
  notes: "2 bytes for button number followed by 2 bytes for state (00 = released, 01 = pressed). Source examples: PBL     CB0101 (press) and PBL     CB0100 (release)."

- id: clock_state
  label: Clock state (DataType 'K')
  type: string
  notes: "Source example: CLK     2K08:05:00-7F-00/00/00-Clock[SUNRISE]. Day mask b0 = Sunday through b7 = disable clock. Clock types include blank (normal), SUNSET, SUNRISE, and RESET."

- id: shutter_position
  label: Shutter output bitmask
  type: string
  notes: "Raw output bitmask from DataType O. DTRV01 examples map shutter 1 UP to bit value 01, DOWN to 02; shutter 2 to 04/08, shutter 3 to 10/20, and shutter 4 to 40/80. These examples do not establish Daxmov04 W output mapping or a complete position state model."
```

## Variables
```yaml
# The source does not document Daxmov04 W-specific settable variables or configuration.
# Whether the generic Light Protocol addresses this model is UNRESOLVED.
```

## Events
```yaml
# The source documents output Light Protocol status frames and examples of status changes.
# It does not specify event subscriptions or filters. Daxmov04 W event applicability is UNRESOLVED.
```

## Macros
```yaml
# The source documents a repeated UP-STOP-DOWN-STOP shutter cycle for DTRV01 examples.
# It does not establish that this behavior applies to Daxmov04 W.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Do NOT connect Domintell bus on the DETH0x RJ45 connector; this can cause fatal damage to the DETH0x module. (Source §2.4)"
# Daxmov04 W-specific motor safety procedures are UNRESOLVED.
```

## Notes
### Source and target
The source is the generic Domintell Light Protocol guide for DRS2320x and Ethernet communication interfaces. It documents commands for multiple module types, including shutter examples for DTRV01, DTRP02, and DTRVBT01. It does not mention Daxmov04 W, give its Mod Type, or establish its channel count or behavior. Applicability of these generic commands to Daxmov04 W is UNRESOLVED.

### Gateway details
- For RS-232 Light Protocol, the source recommends DRS23202; its serial settings are fixed at 57600/8/N/1. DRS23201 has configurable baud and parity, but the source describes it as a string-exchange interface.
- For Ethernet, DETH02 uses UDP, defaults to port 17481 (changeable), can use DHCP or static IP, and permits one client at a time. A password can be set.

### Concatenation and timing
- Multiple Light Protocol messages may be placed in one Ethernet frame separated by the reserved `&` character. DETH0x-specific commands cannot be concatenated this way; send only one such command per UDP frame.
- Leave at least 25 ms between RS-232 messages unless using `&` as documented.
- Maximum Light Protocol message length is 30 characters.
- For DETH02, wait for a reply before sending another command; otherwise commands can be dropped. The source gives a 5–100 ms reply time depending on frame length and bus/network load.
- Send HELLO every 50 seconds to keep a session open. Avoid using PING for keepalive because it creates Domintell bus traffic and uses master resources.

### Case and whitespace
- Strings are not case sensitive; lowercase characters are automatically uppercased, with caveats for accented characters.
- Leading and trailing spaces are trimmed. Leading zeroes in relevant fields may be replaced with spaces as shown in the protocol tables.
- Lowercase `i` appears in a source feedback sample; implementations may encounter it.

### Encoding
- The source advises ASCII because accented characters may occupy multiple bytes under UTF-8.
- In extended mode (since version 5), control characters can be inserted with `<xx>`, where `xx` is a two-character decimal value from 00 to 31.
- `<CR>`, `<LF>`, and `<TAB>` are replaced with 0x0D, 0x0A, and 0x09.

### Daxmov04 W-specific gaps
The source does not state the Daxmov04 W Mod Type, supported output numbers, configuration parameters, calibration procedures, manual override behavior, ratings, firmware compatibility, or motor safety behavior. The source documents generic protocol commands and examples for other named modules; whether they apply to Daxmov04 W is UNRESOLVED.

## Provenance

```yaml
source_domains:
  - pro.mydomintell.com
source_urls:
  - https://pro.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_27_08.pdf
retrieved_at: 2026-08-15T13:45:51.682Z
last_checked_at: 2026-10-07T13:31:53.719Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:31:53.719Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 units match the generic Light Protocol guide and transport supported; source never names Daxmov04 W, so applicability is generic."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
