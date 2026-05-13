---
spec_id: admin/biamp-spm522d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Biamp Advantage SPM522D Control Spec"
manufacturer: Biamp
model_family: "Advantage SPM522D"
aliases: []
compatible_with:
  manufacturers:
    - Biamp
  models:
    - "Advantage SPM522D"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.biamp.com
retrieved_at: 2026-05-04T15:18:53.366Z
last_checked_at: 2026-05-04T05:39:50.623Z
generated_at: 2026-05-04T05:39:50.623Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T05:39:50.623Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions map to documented source commands; transport parameters confirmed; no missing or drifted fields."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Biamp Advantage SPM522D Control Spec

## Summary
The Biamp Advantage SPM522D is a stereo preamp/mixer with RS-232 serial control. Two control modes are available: Control Button Emulation (one-way, ASCII characters emulating the IR remote) and Advanced Computer Control (two-way, binary commands using a proprietary "pseudo-hex" encoding). Up to eight SPM522Ds can be daisy-chained on a single serial link and individually addressed via device type and device number bitmasks.

<!-- UNRESOLVED: no TCP/IP or network transport documented; serial only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400  # 9600 may be supported in future - contact factory
  data_bits: 8
  stop_bits: 1
  parity: none
  flow_control: echo  # wait for each character echo before sending next; single-character input buffer
  encoding: pseudo-hex  # nibbles 0x0-0xF represented as ASCII '0'-'9', ':', ';', '<', '=', '>', '?'
addressing:
  # UNRESOLVED: no TCP/IP port or base URL - serial only
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable    # get-version, get-button-definition, get-source-settings, get-preset-definition, read-memory
- levelable    # volume set/adjust, bass/treble, balance
- routable     # source/channel selection for Main and Zone outputs
```

## Actions
```yaml
# --- Control Button Emulation (one-way ASCII) ---
# Each button is a single ASCII character; repeat held buttons with '@' (0x40)
# Device select prefix chars (0x6C-0x7A) may precede a button char to address devices 1-4

- id: button_emulation
  label: Control Button Emulation
  kind: action
  description: Send single ASCII character corresponding to one of 40 remote control buttons
  params:
    - name: button_number
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
      description: "Button number (1-40). Default mapping: 1=Mic1 Vol Down, 5=Mic1 Vol Up, 8=Main Vol Up, 9=Mic1 Toggle Mute, 12=Main Toggle Mute, 21=Main Recall Preset A, 25=Main Select Source 1, etc."
    - name: device_prefix
      type: string
      required: false
      description: "Optional device select prefix char for multi-unit addressing (devices 1-4). Omit to broadcast to all."

- id: repeat_button
  label: Repeat Last Button
  kind: action
  description: Send '@' (0x40) to repeat the last held button action (auto-sent every 110ms by IR decoder)

# --- Advanced Computer Control ---
# All ACC commands require: [params] 04 (device_type_mask) (device_number_mask) (command_char)
# Device Type Bitmask for SPM522D = 0x04 (bit 2)
# Device Number Bitmask: 0x01=dev1, 0x02=dev2 … 0x80=dev8

- id: virtual_button
  label: Virtual Button
  kind: action
  description: Execute button actions specified by a full button data structure without storing it
  params:
    - name: button_data_structure
      type: string
      description: "16 pseudo-hex chars (8 bytes) - Button Definition Data Structure"
    - name: device_number_mask
      type: integer
      description: "Bitmask selecting target device(s) (0x01-0xFF)"
  command_format: "{button_data_structure}04{device_number_mask:02x}!"

- id: define_button
  label: Define Button
  kind: action
  description: Store a new button definition for a given button number (1-40)
  params:
    - name: button_data_structure
      type: string
      description: "16 pseudo-hex chars (8 bytes) - Button Definition Data Structure"
    - name: button_number
      type: integer
      description: "Button number (1-40). Value transmitted as button_number + 128 in pseudo-hex."
    - name: device_number_mask
      type: integer
  command_format: "{button_data_structure}{button_number+128:02x}04{device_number_mask:02x}\""

- id: do_button
  label: Do Button
  kind: action
  description: Look up and execute the actions stored for a given button number
  params:
    - name: button_number
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    - name: device_number_mask
      type: integer
  command_format: "{button_number:02x}04{device_number_mask:02x}&"

- id: define_source_settings
  label: Define Source Settings
  kind: action
  description: Set treble, bass, and balance for a stereo source (Main + Zone). Stored in non-volatile memory.
  params:
    - name: source_data_structure
      type: string
      description: "8 pseudo-hex chars (4 bytes) - Stereo Source Data Structure"
    - name: source_number
      type: integer
      enum: [1, 2, 3, 4, 5]
      description: "Source number. Transmitted as source_number + 128 in pseudo-hex."
    - name: device_number_mask
      type: integer
  command_format: "{source_data_structure}{source_number+128:02x}04{device_number_mask:02x}#"

- id: define_preset
  label: Define Preset
  kind: action
  description: Store preset settings. Presets 5/11 (current mix) take effect immediately; others stored in non-volatile memory.
  params:
    - name: preset_data_structure
      type: string
      description: "10 pseudo-hex chars (5 bytes) - Preset Data Structure"
    - name: preset_number
      type: integer
      description: "0=Main power-up, 1-4=Main A-D, 5=Main current, 6=Zone power-up, 7-10=Zone E-H, 11=Zone current. Transmitted as preset_number + 128."
    - name: device_number_mask
      type: integer
  command_format: "{preset_data_structure}{preset_number+128:02x}04{device_number_mask:02x}$"

- id: do_preset_action
  label: Do Preset Action
  kind: action
  description: Recall, store, or toggle room-combining for a preset
  params:
    - name: action_code
      type: integer
      enum: [1, 2, 3, 5, 8]
      description: "1=Recall, 2=Store, 3=Combine then Recall, 5=Cancel Combining then Recall, 8=Toggle Combining then Recall"
    - name: preset_number
      type: integer
      description: "1-4=Main A-D, 7-10=Zone E-H (pseudo-hex nibble)"
    - name: device_number_mask
      type: integer
  command_format: "{action_code:x}{preset_number:x}04{device_number_mask:02x}'"

- id: do_volume_action
  label: Do Volume Action
  kind: action
  description: Perform volume action (up/down/mute/unmute/min/max) on one or more faders
  params:
    - name: action_code
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7]
      description: "1=Volume Down, 2=Volume Up, 3=Toggle Mute, 4=Mute, 5=Un-mute, 6=Minimum Vol, 7=Max Vol"
    - name: fader_bitmask
      type: integer
      description: "Bitmask: 0x01=Mic1 Zone, 0x02=Mic2 Zone, 0x04=Mic1 Main, 0x08=Mic2 Main, 0x10=Main Out, 0x20=Zone Out. Combine bits for multiple faders."
    - name: device_number_mask
      type: integer
  command_format: "{action_code:02x}{fader_bitmask:02x}04{device_number_mask:02x}("

- id: set_volume
  label: Set Volume
  kind: action
  description: Set a fader to an absolute volume level (0-31). Bit 7 of volume byte = mute flag.
  params:
    - name: volume
      type: integer
      min: 0
      max: 159
      description: "5-bit level (0-31). Add 128 (0x80) to also mute: e.g. 0x97 = mute with level 23."
    - name: fader_bitmask
      type: integer
      description: "Bitmask: 0x01=Mic1 Zone, 0x02=Mic2 Zone, 0x04=Mic1 Main, 0x08=Mic2 Main, 0x10=Main Out, 0x20=Zone Out"
    - name: device_number_mask
      type: integer
  command_format: "{volume:02x}09{fader_bitmask:02x}04{device_number_mask:02x}("
  notes: "Not available in firmware prior to 23-Aug-95"

- id: do_balance_action
  label: Do Balance Action
  kind: action
  description: Shift or center the balance for the currently selected stereo source
  params:
    - name: action_code
      type: string
      enum: ["0=", "0>", "0?"]
      description: "0;=Shift Left, 0>=Shift Right, 0?=Reset to Center (pseudo-hex notation)"
    - name: room_bitmask
      type: integer
      description: "0x40=Main, 0x80=Zone, 0xC0 (pseudo-hex <0)=both"
    - name: device_number_mask
      type: integer
  command_format: "{action_code}{room_bitmask:02x}04{device_number_mask:02x}("

- id: do_tone_action
  label: Do Tone Action
  kind: action
  description: Perform bass/treble cut, boost, or reset-to-flat for the currently selected stereo source
  params:
    - name: treble_action
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=NOP, 1=Cut, 2=Boost, 3=Reset to Flat"
    - name: bass_action
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=NOP, 1=Cut, 2=Boost, 3=Reset to Flat"
    - name: room_bitmask
      type: integer
      description: "0x40=Main, 0x80=Zone, 0xC0=both"
    - name: device_number_mask
      type: integer
  command_format: "{treble_action:x}{bass_action:x}{room_bitmask:02x}04{device_number_mask:02x})"

- id: do_source_select
  label: Do Source Select
  kind: action
  description: Select a stereo source channel or control channel 5 override
  params:
    - name: action_code
      type: integer
      enum: [1, 2, 3, 4, 5, 7, 8, 9]
      description: "1-5=select channel 1-5, 7=toggle ch5 override, 8=activate ch5 override, 9=cancel ch5 override"
    - name: room_bitmask
      type: integer
      description: "0x40=Main, 0x80=Zone, 0xC0=both"
    - name: device_number_mask
      type: integer
  command_format: "{action_code:02x}{room_bitmask:02x}04{device_number_mask:02x}*"

- id: do_misc_ch5_override
  label: Set Ch5 Override Permission
  kind: action
  description: Allow or disallow Channel 5 Override for Main or Zone current mix
  params:
    - name: allowed
      type: integer
      enum: [0, 1]
      description: "0=not allowed, 1=allowed"
    - name: action_code
      type: integer
      enum: [129, 130]
      description: "0x81=Main, 0x82=Zone"
    - name: device_number_mask
      type: integer
  command_format: "{allowed:02x}{action_code:02x}04{device_number_mask:02x}%"

- id: do_misc_mic_priority
  label: Set Mic Priority
  kind: action
  description: Assign mic priority for Main or Zone current mix
  params:
    - name: priority
      type: integer
      enum: [0, 1, 2]
      description: "0=None, 1=Mic 1, 2=Mic 2"
    - name: action_code
      type: integer
      enum: [131, 132]
      description: "0x83=Main, 0x84=Zone"
    - name: device_number_mask
      type: integer
  command_format: "{priority:02x}{action_code:02x}04{device_number_mask:02x}%"

- id: do_misc_mic_enable
  label: Enable/Disable Mic
  kind: action
  description: Enable or disable Mic 1 or Mic 2 for Main or Zone current mix
  params:
    - name: enabled
      type: integer
      enum: [0, 1]
      description: "0=Disable, 1=Enable"
    - name: action_code
      type: integer
      enum: [133, 134, 135, 136]
      description: "0x85=Mic1 Main, 0x86=Mic2 Main, 0x87=Mic1 Zone, 0x88=Mic2 Zone"
    - name: device_number_mask
      type: integer
  command_format: "{enabled:02x}{action_code:02x}04{device_number_mask:02x}%"

- id: sleep_10_seconds
  label: Sleep 10 Seconds
  kind: action
  description: Device ignores all serial and IR input for 10 seconds (used for modem hang-up)
  params:
    - name: device_number_mask
      type: integer
  command_format: "04{device_number_mask:02x}+"

- id: write_memory
  label: Write Memory
  kind: action
  description: Write up to 16 bytes to non-volatile configuration memory. Includes checksum verification.
  params:
    - name: data_values
      type: string
      description: "Up to 16 pseudo-hex data values, sent in reverse address order"
    - name: start_address
      type: integer
      description: "Starting (lowest) memory address"
    - name: options
      type: integer
      description: "Bits 0-3=count-1, bit 5=bank(0 or 1), bit 7=activate config after write"
    - name: checksum
      type: integer
      description: "1's complement of 8-bit sum of all data values + start address + options (pre pseudo-hex)"
    - name: device_number_mask
      type: integer
  command_format: "{data_values}{start_address:02x}{options:02x}{checksum:02x}04{device_number_mask:02x}-"

- id: set_factory_defaults
  label: Set Factory Defaults
  kind: action
  description: Reset selected configuration areas to factory defaults
  params:
    - name: options
      type: integer
      description: "bit 0=buttons, bit 1=presets, bit 2=global config, bit 3=source tone/balance, bit 7=activate config now"
    - name: device_number_mask
      type: integer
  command_format: "<>{options:02x}04{device_number_mask:02x}."
  notes: "Requires dummy prefix chars '<' and '>'. Firmware < July 2, 1995 ignores command if bit 3 set."
```

## Feedbacks
```yaml
- id: get_button_definition
  label: Get Button Definition
  type: string
  description: "Returns 16 pseudo-hex chars (8-byte Button Definition Data Structure)"
  query_format: "{button_number+64:02x}04{device_number_mask:02x}\""
  response_format: "{button_data_structure}<CR>"

- id: get_source_settings
  label: Get Source Settings
  type: string
  description: "Returns 8 pseudo-hex chars (4-byte Stereo Source Data Structure with Main+Zone treble/bass/balance)"
  query_format: "{source_number+64:02x}04{device_number_mask:02x}#"
  response_format: "{source_data_structure}<CR>"

- id: get_preset_definition
  label: Get Preset Definition
  type: string
  description: "Returns 10 pseudo-hex chars (5-byte Preset Data Structure)"
  query_format: "{preset_number+64:02x}04{device_number_mask:02x}$"
  response_format: "{preset_data_structure}<CR>"

- id: get_version
  label: Get Version
  type: string
  description: "Returns model ID and firmware date in format '01 mm:dd:yy'"
  query_format: "04{device_number_mask:02x}/"
  response_format: "01 mm:dd:yy <CR>"

- id: read_memory
  label: Read Memory
  type: string
  description: "Returns up to 256 pseudo-hex data values from non-volatile config memory (sent in reverse address order)"
  query_format: "{bank:02x}{end_address:02x}{start_address:02x}04{device_number_mask:02x},"
  response_format: "{data_values}<CR>"
```

## Variables
```yaml
- id: volume
  label: Volume Level
  type: integer
  min: 0
  max: 31
  description: "5-bit volume step (0=min, 31=max). Controlled via set-volume or do-volume-action."
  faders:
    - Mic 1 Zone (0x01)
    - Mic 2 Zone (0x02)
    - Mic 1 Main (0x04)
    - Mic 2 Main (0x08)
    - Main Output (0x10)
    - Zone Output (0x20)

- id: mute_state
  label: Mute State
  type: boolean
  description: "Bit 7 of volume byte in preset data. Controlled via do-volume-action (toggle/mute/unmute)."

- id: bass
  label: Bass
  type: integer
  min: 0
  max: 12
  description: "0x00 = max cut (-12 dB), 0x06 = flat, 0x0C = max boost (+12 dB). Per stereo source, per room."

- id: treble
  label: Treble
  type: integer
  min: 0
  max: 12
  description: "0x00 = max cut (-12 dB), 0x06 = flat, 0x0C = max boost (+12 dB). Per stereo source, per room."

- id: balance
  label: Balance
  type: integer
  description: "Single fader value (0x08-0x14) with L/R flag bits. Centered = 0x14 on both channels."
```

## Events
```yaml
# No unsolicited events. The SPM522D only responds to queries.
# Characters are echoed back as a flow-control mechanism, not as events.
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety interlocks or power sequencing requirements
```

## Notes
- The SPM522D uses a proprietary "pseudo-hex" encoding where nibble values 0x0–0xF map to ASCII chars '0'–'9', ':', ';', '<', '=', '>', '?'. Standard ASCII-hex (A–F) is NOT used.
- All Advanced Computer Control commands are prefixed with Device Type Bitmask (0x04 for SPM522D) and Device Number Bitmask, enabling multi-unit addressing on one serial link.
- Spaces, tabs, CR, LF, and other control characters may be freely interspersed (even between pseudo-hex nibbles) and will be ignored.
- Echo-based flow control is mandatory: the computer must wait for each transmitted character to be echoed before sending the next, since the SPM522D has only a single-character input buffer.
- The Opt. X dip-switch controls whether a line feed follows each carriage return in responses (disabled by default).
- Volume levels are 5-bit values (steps 0–31). Bit 7 of the volume byte is the mute flag.
- Tone values range from 0x00 (cut -12 dB) to 0x0C (boost +12 dB), with 0x06 = flat.
- Balance uses a single fader value (0x08–0x14) with flag bits indicating left vs. right channel.
- Button definitions, presets, and source settings are stored in 512 bytes of non-volatile configuration memory (two banks of 256 bytes each).
- The write-memory command uses a checksum (1's complement of 8-bit sum) for data integrity.

<!-- UNRESOLVED: firmware version compatibility ranges not stated (some commands noted as not available before specific dates) -->
<!-- UNRESOLVED: no power on/off command documented -->
<!-- UNRESOLVED: physical connector pinout not documented in this source -->
<!-- UNRESOLVED: maximum serial cable length not stated -->

## Provenance

```yaml
source_domains:
  - downloads.biamp.com
retrieved_at: 2026-05-04T15:18:53.366Z
last_checked_at: 2026-05-04T05:39:50.623Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T05:39:50.623Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions map to documented source commands; transport parameters confirmed; no missing or drifted fields."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
