---
spec_id: admin/sonifex-s1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonifex S1 Mixer Control Spec"
manufacturer: Sonifex
model_family: "Sonifex S1 Mixing Desk"
aliases: []
compatible_with:
  manufacturers:
    - Sonifex
  models:
    - "Sonifex S1 Mixing Desk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad56550c.delivery.rocketcdn.me
source_urls:
  - https://ad56550c.delivery.rocketcdn.me/wp-content/uploads/products/S1/s1_hb.pdf
retrieved_at: 2026-06-30T23:36:47.348Z
last_checked_at: 2026-07-07T12:41:19.940Z
generated_at: 2026-07-07T12:41:19.940Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "GPI/SRQ command details (\"not included\" per source). Voltage/power specs not in excerpt."
  - "response not documented in source"
  - "SRQ detailed format (\"not included\" per source note for GPI/SRQ)"
  - "no continuously variable set-points documented as standalone variables;"
  - "no multi-step sequences documented in source"
  - "source contains no explicit safety warnings or interlock procedures for"
  - "detailed GPI/SRQ protocol \"not included\" in this excerpt."
  - "voltage/current/power specs not present in this excerpt."
  - "response payloads for DST:, DWN:, RST:, SFD: not documented."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:41:19.940Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched verbatim; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Sonifex S1 Mixer Control Spec

## Summary
The Sonifex S1 is a broadcast mixing desk controllable over an RS-232 serial link, either via the Sonifex SCi configuration software or a text-based terminal. This spec covers the S1's ASCII serial command protocol (configure commands, read/status queries, and firmware upload commands) as documented in Handbook Rev 1.05 (July 2020), section 8.

<!-- UNRESOLVED: GPI/SRQ command details ("not included" per source). Voltage/power specs not in excerpt. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200      # default; source: "will automatically revert to 19200 when the desk is reset or turned on"
  data_bits: 8          # source: "19200,e,8,1"
  parity: even          # source: "19200,e,8,1" (e = even)
  stop_bits: 1          # source: "19200,e,8,1"
  flow_control: xon_xoff  # source: "with XON/XOFF flow control"
auth:
  type: none  # inferred: no auth/login procedure in source
# Note: configurable baud rates per source: 9600, 19200, 38400, 57600, 115200
# Command framing: commands terminated by CR (LF ignored); responses CR+LF terminated
```

## Traits
```yaml
- queryable   # inferred: many read/status queries (CMD:a? form) documented
- levelable   # inferred: intensity/frequency set controls (MTR, COL, OPS)
- routable    # inferred: channel select, monitor select, remote routing commands (CHS, MON, RMA/RMB, CON)
```

## Actions
```yaml
- id: configure_auto_cue_pfl_buttons
  label: Configure Auto CUE/PFL Buttons
  kind: action
  command: "ACP:a,b,c"
  params:
    - name: a
      type: string
      description: "Channel/scope: 1=Guest CUE/PFL, 2=Monitor CUE/PFL, 3=Presenter CUE/PFL, 4=Reserved, 5=Split CUE/PFL, B=Button Control"
    - name: b
      type: integer
      description: "1=on, 0=off (2=ignore/no change)"
    - name: c
      type: integer
      description: "Lock Out Button: 1=Lock out, 0=Normal Operation"

- id: read_auto_cue_pfl_button_status
  label: Read Auto CUE/PFL Button Status
  kind: query
  command: "ACP:a?"
  params:
    - name: a
      type: string
      description: "Channel number (see ACP scope)"

- id: configure_auxiliary_buttons
  label: Configure Auxiliary Buttons
  kind: action
  command: "AUX:a,b,c,d"
  params:
    - name: a
      type: integer
      description: "Aux channel: 1=Ch1, 2=Ch2"
    - name: b
      type: integer
      description: "Button Control: 1=on, 0=off"
    - name: c
      type: integer
      description: "Lock Out Button: 1=Lock out, 0=Normal Operation"
    - name: d
      type: integer
      description: "Lock Btn if set to Post when Fader is Up: 1=Lock, 0=Normal Operation"

- id: read_auxiliary_button_status
  label: Read Auxiliary Button Status
  kind: query
  command: "AUX:a?"
  params:
    - name: a
      type: integer
      description: "Aux channel number"

- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: "Bnn:"
  params:
    - name: nn
      type: integer
      description: "Baud rate code: 11=115200, 57=57600, 38=38400, 19=19200, 96=9600"

- id: read_base_firmware_version
  label: Base Firmware Version
  kind: query
  command: "BSV:"
  params: []

- id: configure_channel_select_buttons
  label: Configure Channel Select Buttons
  kind: action
  command: "CHS:a,b,c"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Button Control (Ch 1,2,5-10: 2=No Change,1=Input2,0=Input1; Ch 3,4: 2=Input3,1=Input2,0=Input1)"
    - name: c
      type: integer
      description: "Lock Out Button (Ch 1,2,5-10: 1=Lock out,0=Normal; Ch 3,4: 3=Disable Stereo Line,2=Disable Mono Line,1=Lock out,0=Normal)"

- id: read_channel_select_button_status
  label: Read Channel Select Button Status
  kind: query
  command: "CHS:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: update_intensity
  label: Update LED Colour Intensity
  kind: action
  command: "COL:a,b,c,d,e"
  params:
    - name: a
      type: string
      description: "A=Red"
    - name: b
      type: string
      description: "B=Green"
    - name: c
      type: string
      description: "C=Green/Orange"
    - name: d
      type: string
      description: "D=Red/Orange"
    - name: e
      type: string
      description: "E=3MM RED LEDs (hex values 0-f per colour)"

- id: read_colour_values
  label: Read Colour Values
  kind: query
  command: "COL:?"
  params: []

- id: configure_on_buttons
  label: Configure ON Buttons
  kind: action
  command: "CON:a,b,c,d,e,f,g"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Input 1 ON Control: 1=on, 0=off"
    - name: c
      type: integer
      description: "Input 2 ON Control: 1=on, 0=off"
    - name: d
      type: integer
      description: "Mode for Input 1: 0=ON/OFF, 1=ON/REPEAT/OFF"
    - name: e
      type: integer
      description: "Mode for Input 2: 0=ON/OFF, 1=ON/REPEAT/OFF"
    - name: f
      type: integer
      description: "Lock Button: 0=Normal Operation, 1=Button Locked"
    - name: g
      type: integer
      description: "Force Fader Up: 1=Fader Forced Up, 0=Normal Operation"

- id: read_on_button_status
  label: Read ON Button Status
  kind: query
  command: "CON:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: configure_dim_mute_on_pfl
  label: Configure DIM/MUTE on PFL
  kind: action
  command: "DIM:a"
  params:
    - name: a
      type: integer
      description: "1=Dim Monitors on PFL, 0=Mute Monitors on PFL"

- id: read_dim_mute_on_pfl_status
  label: Read DIM/MUTE on PFL Status
  kind: query
  command: "DIM:?"
  params: []

- id: read_digital_input_status
  label: Read Digital Input Status
  kind: query
  command: "DIS:?"
  params: []

- id: upload_sub_processor_firmware
  label: Upload Sub Processor Firmware
  kind: action
  command: "DST:"
  params: []
  # UNRESOLVED: response not documented in source

- id: upload_processor_firmware
  label: Upload Processor Firmware
  kind: action
  command: "DWN:"
  params: []
  # UNRESOLVED: response not documented in source

- id: save_configuration
  label: Save Configuration (EEPROM write enable + autosave)
  kind: action
  command: "EEP:a,b"
  params:
    - name: a
      type: integer
      description: "Enable write: 1=write config to eeprom, 0=no write"
    - name: b
      type: integer
      description: "Enable Auto Save Settings: 1=autosave enabled, 0=disabled"

- id: read_eeprom_status
  label: Read EEPROM Status
  kind: query
  command: "EEP:?"
  params: []

- id: configure_gpio
  label: Configure GPIO
  kind: action
  command: "GPI:a,b"
  params:
    - name: a
      type: integer
      description: "GPIO Pin Number (1-5)"
    - name: b
      type: string
      description: "Data"

- id: read_gpio_data
  label: Read GPIO Data
  kind: query
  command: "GPI:?"
  params: []

- id: configure_global_talkback_mode
  label: Configure Global Talkback Mode
  kind: action
  command: "GTB:a,b,c"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Input 1 Global Talkback Enable: 1=on, 0=off"
    - name: c
      type: integer
      description: "Input 2 Global Talkback Enable: 1=on, 0=off"

- id: read_global_talkback_mode_status
  label: Read Global Talkback Mode Status
  kind: query
  command: "GTB:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: configure_control_room_mute
  label: Configure Control Room Mute
  kind: action
  command: "MCH:a,b,c"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Input 1 Mute: 1=Enabled, 0=Disabled"
    - name: c
      type: integer
      description: "Input 2 Mute: 1=Enabled, 0=Disabled"

- id: read_control_room_mute_status
  label: Read Control Room Mute Status
  kind: query
  command: "MCH:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: configure_meter_follows_monitors
  label: Configure Meter Follows Monitors
  kind: action
  command: "MFM:a,b"
  params:
    - name: a
      type: integer
      description: "Button Control: 1=on, 0=off"
    - name: b
      type: integer
      description: "Lock Out Button: 1=Lock out, 0=Normal Operation"

- id: read_mfm_button_status
  label: Read MFM Button Status
  kind: query
  command: "MFM:?"
  params: []

- id: configure_monitor_selection_buttons
  label: Configure Monitor Selection Buttons
  kind: action
  command: "MON:a,b,c,d"
  params:
    - name: a
      type: integer
      description: "Monitor selection: 1=PGM, 2=Aux1, 3=Aux2, 4=Ext1, 5=Ext2"
    - name: b
      type: integer
      description: "Button Control: 1=on, 0=off"
    - name: c
      type: integer
      description: "Lock Out Button: 1=Lock out, 0=Normal Operation"
    - name: d
      type: integer
      description: "Interlock or Mix: 0=Mix, 1=Interlocking"

- id: read_monitor_selection_button_status
  label: Read Monitor Selection Button Status
  kind: query
  command: "MON:a?"
  params:
    - name: a
      type: integer
      description: "Monitor selection number"

- id: configure_meter_mode
  label: Configure Meter Mode
  kind: action
  command: "MTR:a,b"
  params:
    - name: a
      type: integer
      description: "Meter Mode: 2=No Change, 1=PPM, 0=VU"
    - name: b
      type: integer
      description: "Intensity: 0=Disabled, 1-7=Levels, 8=No Change"

- id: read_meter_status
  label: Read Meter Status
  kind: query
  command: "MTR:?"
  params: []

- id: configure_digital_synchronisation
  label: Configure Digital Synchronisation
  kind: action
  command: "OPM:a"
  params:
    - name: a
      type: integer
      description: "Mode: 0=Internal, 1=External, 2=External with fallback to internal"

- id: read_digital_sync_mode_status
  label: Read Digital Sync Mode Status
  kind: query
  command: "OPM:?"
  params: []

- id: configure_internal_sync_frequency
  label: Configure Internal Operating Frequency
  kind: action
  command: "OPS:x"
  params:
    - name: x
      type: integer
      description: "Frequency: 0=32kHz, 1=44.1kHz, 2=48kHz, 3=Reserved, 4=64kHz, 5=88.2kHz, 6=96kHz (valid only when Digital sync=Internal; else Err:07)"

- id: read_internal_sync_frequency
  label: Read Internal SYNC Frequency
  kind: query
  command: "OPS:?"
  params: []

- id: configure_cue_pfl_buttons
  label: Configure CUE/PFL Buttons
  kind: action
  command: "PFL:a,b,c,d,e"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Button Control: 1=on, 0=off"
    - name: c
      type: integer
      description: "Auto Cancel PFL on Fader Up: 1=Auto Cancel, 0=Normal Operation"
    - name: d
      type: integer
      description: "Talkback Disabled: 0=Disabled, 1=Normal Operation (inputs 5 & 6 only)"
    - name: e
      type: integer
      description: "Lock Out Button: 1=Lock out, 0=Normal Operation"

- id: read_pfl_button_status
  label: Read PFL Button Status
  kind: query
  command: "PFL:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: configure_input_1_remotes
  label: Configure Input 1 Remotes
  kind: action
  command: "RMA:a,b,c,d,e,f"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Start Function: 1=Momentary, 0=Continuous"
    - name: c
      type: integer
      description: "Stop Function: 1=Momentary, 0=Continuous"
    - name: d
      type: integer
      description: "Mode: 0=Disabled, 1=Start ON&FaderUp, 2=Telco, 3=Start ON&FaderUp or CUE/PFL, 4=Telco w/ CUE/PFL, 5=No change"
    - name: e
      type: integer
      description: "Tally Back: 0=Disabled, 1=Enabled"
    - name: f
      type: integer
      description: "Automation Tally (End-of-Track ON Button Flash): 0=Disabled, 1=Enabled"

- id: read_input_a_remote_configuration
  label: Read Input A Remote Configuration
  kind: query
  command: "RMA:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: configure_input_2_remotes
  label: Configure Input 2 Remotes
  kind: action
  command: "RMB:a,b,c,d,e,f"
  params:
    - name: a
      type: string
      description: "Channel number"
    - name: b
      type: integer
      description: "Start Function (see RMA)"
    - name: c
      type: integer
      description: "Stop Function (see RMA)"
    - name: d
      type: integer
      description: "Mode (see RMA)"
    - name: e
      type: integer
      description: "Tally Back (see RMA)"
    - name: f
      type: integer
      description: "Automation Tally (see RMA)"

- id: read_input_b_remote_configuration
  label: Read Input B Remote Configuration
  kind: query
  command: "RMB:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: reset_mixer
  label: Reset Mixer
  kind: action
  command: "RST:"
  params: []
  # UNRESOLVED: response not documented in source

- id: read_unit_serial_number
  label: Unit Serial Number
  kind: query
  command: "SER:"
  params: []

- id: factory_defaults_reboot
  label: Set Factory Defaults and Reboot
  kind: action
  command: "SFD:"
  params: []
  # UNRESOLVED: response not documented in source

- id: status_request
  label: Status Request
  kind: query
  command: "SRQ:?"
  params: []

- id: tally_control
  label: Tally Control
  kind: action
  command: "TAL:a,b,c,d,e"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Input 1 Tally Back: 1=Active, 0=Inactive"
    - name: c
      type: integer
      description: "Input 2 Tally Back: 1=Active, 0=Inactive"
    - name: d
      type: integer
      description: "Input 1 Auto Tally: 1=Active, 0=Inactive"
    - name: e
      type: integer
      description: "Input 2 Auto Tally: 1=Active, 0=Inactive"

- id: read_tally_input_status
  label: Read Tally Input Status
  kind: query
  command: "TAL:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: configure_talkback
  label: Configure Talkback
  kind: action
  command: "TBK:a,b,c,d"
  params:
    - name: a
      type: integer
      description: "Button Control: 1=on, 0=off"
    - name: b
      type: integer
      description: "Mix/Cut into Guest Headphones: 1=Cut, 0=Mix"
    - name: c
      type: integer
      description: "Talkback Source: 1=Channel 1 Line, 0=Channel 1 Mic"
    - name: d
      type: integer
      description: "Talkback Permanently Routed to TB connector: 1=Always Routed, 0=Only when T/B button pressed"

- id: read_talkback_status
  label: Read Talkback Status
  kind: query
  command: "TBK:?"
  params: []

- id: configure_timers
  label: Configure Timers
  kind: action
  command: "TMR:a,b,c,d,e"
  params:
    - name: a
      type: string
      description: "Channel number: 1=Ch1 ... a=Ch10"
    - name: b
      type: integer
      description: "Timer 1 on Input 1: 1=Enabled, 0=Disabled"
    - name: c
      type: integer
      description: "Timer 2 on Input 1: 1=Enabled, 0=Disabled"
    - name: d
      type: integer
      description: "Timer 1 on Input 2: 1=Enabled, 0=Disabled"
    - name: e
      type: integer
      description: "Timer 2 on Input 2: 1=Enabled, 0=Disabled"

- id: read_channel_timer_settings
  label: Read Channel Timer Settings
  kind: query
  command: "TMR:a?"
  params:
    - name: a
      type: string
      description: "Channel number"

- id: unit_identification
  label: Unit Identification
  kind: query
  command: "UID:"
  params: []

- id: update_eeprom_config
  label: Update EEPROM with Current Configuration
  kind: action
  command: "UPD:"
  params: []
  # Response: "Please Wait…" then ACK:; Err:08 if write disabled (enable via EEP:1,2)

- id: firmware_version
  label: Firmware Version
  kind: query
  command: "VER:"
  params: []
  # Response VER:x.xx-Sy.y (x.xx=output board fw, Sy.y=stereo board fw)
```

## Feedbacks
```yaml
- id: ack
  type: literal
  values: ["ACK:"]   # generic success acknowledgement for configure commands

- id: auto_cue_pfl_status
  type: structured
  format: "ACP:a,b,c"

- id: auxiliary_button_status
  type: structured
  format: "AUX:a,b,c,d"

- id: base_firmware_version
  type: string
  format: "BSV:x"

- id: channel_select_status
  type: structured
  format: "CHS:a,b,c"

- id: colour_values
  type: structured
  format: "COL:a,b,c,d,e"

- id: on_button_status
  type: structured
  format: "CON:a,b,c,d,e,f,g,h,i"   # incl. H=Fader Position, I=Channel Routed

- id: dim_mute_status
  type: structured
  format: "DIM:a,b"

- id: digital_input_status
  type: structured
  format: "DIS:a,b,c,d"

- id: eeprom_status
  type: structured
  format: "EEP:a,b,c"

- id: gpio_data
  type: structured
  format: "GPI:X,Y"

- id: global_talkback_status
  type: structured
  format: "GTB:a,b,c"

- id: control_room_mute_status
  type: structured
  format: "MCH:a,b,c"

- id: mfm_status
  type: structured
  format: "MFM:a,b"

- id: monitor_selection_status
  type: structured
  format: "MON:a,b,c,d"

- id: meter_status
  type: structured
  format: "MTR:a,b"

- id: digital_sync_mode_status
  type: structured
  format: "OPM:a,b"

- id: internal_sync_frequency
  type: string
  format: "OPS:x"

- id: pfl_button_status
  type: structured
  format: "PFL:a,b,c,d,e"

- id: input_a_remote_config
  type: structured
  format: "RMA:a,b,c,d,e,f,g,h"

- id: input_b_remote_config
  type: structured
  format: "RMB:a,b,c,d,e,f,g,h"

- id: unit_serial_number
  type: string
  format: "SER:x"

- id: status_request_data
  type: raw
  format: "SRQ:data"
  # UNRESOLVED: SRQ detailed format ("not included" per source note for GPI/SRQ)

- id: tally_input_status
  type: structured
  format: "TAL:a,b,c,d,e;"

- id: talkback_status
  type: structured
  format: "TBK:a,b,c,d"

- id: channel_timer_settings
  type: structured
  format: "TMR:a,b,c,d,e"

- id: unit_identification
  type: literal
  values: ["UID:S1-MIXER"]

- id: firmware_version_string
  type: string
  format: "VER:x.xx-Sy.y"

- id: error
  type: enum
  description: "Error responses"
  values:
    - "Err:01"   # Command Not Found
    - "Err:02"   # Missing Parameter
    - "Err:04"   # Parameter out of Range
    - "Err:06"   # Serial Number Write Error
    - "Err:07"   # Command Not Valid in current mode
    - "Err:08"   # EEPROM write is disabled
    - "Err:09"   # TWI / Checksum Error
```

## Variables
```yaml
# UNRESOLVED: no continuously variable set-points documented as standalone variables;
# all settable parameters are carried as discrete action params above.
```

## Events
```yaml
- id: welcome_string
  description: "Sent after power up"
  payload: "Initialising S1 Mixing Desk… done"
  unsolicited: true

- id: please_wait
  description: "Sent during EEPROM update (UPD:)"
  payload: "Please Wait…"
  unsolicited: true
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures for
# serial control. Factory reset (SFD: / physical 3-button hold) and reset (RST:) cause
# reboots but no warning text is present in this excerpt.
```

## Notes
- Command framing: commands terminated by CR; optional LF ignored. Responses CR+LF terminated. All parameters are hex; commands are case-insensitive.
- On/off style options (1/0) also accept value `2` meaning "ignore operation / no change".
- `||` in source tables marks a valid short-form command termination point.
- Configurable baud rates: 9600, 19200, 38400, 57600, 115200 — desk auto-reverts to 19200 on reset/power-on. Changing the baud rate via `Bnn:` is acknowledged at the OLD rate (`ACK: (at old rate)`).
- Physical connectors: 9-pin D socket carries RS-232 (also external inputs, aux outs, talkback); 25-pin plug for remotes; 15-pin socket for meter bridge.
- `SCi` software support for S1 starts at version 1.110.
- Channels: 1-10. Channels 1-5 on Input 1 have no stop remotes (C param still required, ignored).
- Channel 9 & 10 have SPDIF/Optical digital input selection reported in `DIS:?`.
<!-- UNRESOLVED: detailed GPI/SRQ protocol "not included" in this excerpt. -->
<!-- UNRESOLVED: voltage/current/power specs not present in this excerpt. -->
<!-- UNRESOLVED: response payloads for DST:, DWN:, RST:, SFD: not documented. -->
````

## Provenance

```yaml
source_domains:
  - ad56550c.delivery.rocketcdn.me
source_urls:
  - https://ad56550c.delivery.rocketcdn.me/wp-content/uploads/products/S1/s1_hb.pdf
retrieved_at: 2026-06-30T23:36:47.348Z
last_checked_at: 2026-07-07T12:41:19.940Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:41:19.940Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched verbatim; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "GPI/SRQ command details (\"not included\" per source). Voltage/power specs not in excerpt."
- "response not documented in source"
- "SRQ detailed format (\"not included\" per source note for GPI/SRQ)"
- "no continuously variable set-points documented as standalone variables;"
- "no multi-step sequences documented in source"
- "source contains no explicit safety warnings or interlock procedures for"
- "detailed GPI/SRQ protocol \"not included\" in this excerpt."
- "voltage/current/power specs not present in this excerpt."
- "response payloads for DST:, DWN:, RST:, SFD: not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
