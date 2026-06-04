---
spec_id: admin/audio-authority-sf-16m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio Authority SF-16M Control Spec"
manufacturer: "Audio Authority"
model_family: SF-16M
aliases: []
compatible_with:
  manufacturers:
    - "Audio Authority"
  models:
    - SF-16M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audioauthority.com
  - manualslib.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/752-607B_SF-16M_tech-manual_20150617.pdf
  - https://www.audioauthority.com/downloads/manuals/sf-16m_ci_manual_752-607_20130820.pdf
  - https://www.manualslib.com/manual/734530/Audio-Authority-Sf-16m.html
  - https://www.audioauthority.com/downloadlist
retrieved_at: 2026-06-03T08:14:06.587Z
last_checked_at: 2026-06-04T06:24:28.980Z
generated_at: 2026-06-04T06:24:28.980Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "voltage/current/power specs not stated in source"
  - "no settable parameter that is not a discrete action exists;"
  - "source does not document unsolicited notifications."
  - "no multi-step sequences described explicitly in source."
  - "firmware version compatibility not stated in source."
  - "voltage/current/power specifications not stated in source."
  - "hex/binary command byte encodings not stated; the source uses ASCII command strings."
  - "detailed parametric EQ band count and audio override count limits not stated in source."
  - "max number of scene presets beyond the 10 referenced in the SAVE examples not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:24:28.980Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions matched source structure and examples verbatim; transport parameters verified in source documentation. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Audio Authority SF-16M Control Spec

## Summary
The SF-16M is a 16-output audio matrix / zone processor with serial (RS-232, DB-9) and Ethernet (Telnet, default port 23) control. Open-control architecture exposes volume, EQ, source routing, audio overrides, scene presets, and standby/state to third-party automation controllers. All commands are ASCII strings wrapped in square brackets with replies wrapped in parentheses.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specs not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # stated in source: "leave the default port (23) to connect"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  character_type: ASCII
  connector: DB-9
auth:
  type: none  # inferred: no auth procedure in source
```

**Transport notes:**
- RS-232 DB-9: Pin 2 Tx, Pin 3 Rx, Pin 5 Ground, Shell Ground; 9600 bps, 8-N-1, ASCII, no flow control.
- Ethernet: Telnet server, max 2 concurrent clients, 15-minute idle timeout per client. DHCP enabled by default. SDDP enabled (Control4).

## Traits
```yaml
- powerable       # inferred: standby + system trigger commands present
- routable        # inferred: source select commands present (per-output + all-outputs)
- queryable       # inferred: X? / Q query commands + parenthesized reply structure
- levelable       # inferred: volume, mute, balance, bass, treble, EQ band level commands
```

## Actions
```yaml
# --- Source Select ---
- id: select_output_input
  label: Switch an output to a source input
  kind: action
  command: "[CO{output}I{input}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: input
      type: integer
      description: Source input number

- id: select_all_outputs_input
  label: Switch all outputs to one source input
  kind: action
  command: "[CXI{input}]"
  params:
    - name: input
      type: integer
      description: Source input number

# --- Volume ---
- id: volume_up
  label: Output volume up one step
  kind: action
  command: "[VO{output}U]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: volume_down
  label: Output volume down one step
  kind: action
  command: "[VO{output}D]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: volume_set
  label: Set output volume level
  kind: action
  command: "[VO{output}R{level}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: level
      type: integer
      description: Volume in dB; range -80 to 0

# --- Mute ---
- id: mute_on
  label: Output mute on
  kind: action
  command: "[VMO{output}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: mute_off
  label: Output unmute
  kind: action
  command: "[VUMO{output}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: mute_toggle
  label: Output mute toggle
  kind: action
  command: "[VMTO{output}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

# --- Balance ---
- id: balance_left_up
  label: Balance one step to the left
  kind: action
  command: "[BO{output}LU]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: balance_right_up
  label: Balance one step to the right
  kind: action
  command: "[BO{output}RU]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: balance_center
  label: Balance to the center
  kind: action
  command: "[BO{output}R0]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: balance_set_left
  label: Set balance level to the left
  kind: action
  command: "[BO{output}L{level}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: level
      type: integer
      description: Balance offset to the left; range 0 to +80, 0 = center

- id: balance_set_right
  label: Set balance level to the right
  kind: action
  command: "[BO{output}R{level}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: level
      type: integer
      description: Balance offset to the right; range 0 to +80, 0 = center

# --- Lowpass Mode ---
- id: mode_lowpass
  label: Set output to lowpass mode (subwoofer/mono)
  kind: action
  command: "[EO{output}M4]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: lowpass_set_frequency
  label: Set lowpass crossover frequency
  kind: action
  command: "[EO{output}LP{frequency}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: frequency
      type: integer
      description: Crossover frequency in Hz; range 40 to 240

# --- Tone Mode (Bass & Treble) ---
- id: mode_tone
  label: Set output to tone mode (bass/treble)
  kind: action
  command: "[EO{output}M3]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: bass_up
  label: Bass up one step
  kind: action
  command: "[TO{output}BU]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: bass_down
  label: Bass down one step
  kind: action
  command: "[TO{output}BD]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: treble_up
  label: Treble up one step
  kind: action
  command: "[TO{output}TU]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: treble_down
  label: Treble down one step
  kind: action
  command: "[TO{output}TD]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: tone_set
  label: Set bass/treble level
  kind: action
  command: "[TO{output}B{bass}T{treble}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: bass
      type: integer
      description: Bass level in dB; range -12 to +12, 0 = flat
    - name: treble
      type: integer
      description: Treble level in dB; range -12 to +12, 0 = flat

# --- EQ Mode ---
- id: mode_eq
  label: Set output to EQ mode
  kind: action
  command: "[EO{output}M1]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: eq_band_up
  label: EQ band up one step
  kind: action
  command: "[EO{output}B{band}U]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number

- id: eq_band_down
  label: EQ band down one step
  kind: action
  command: "[EO{output}B{band}D]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number

- id: eq_band_set
  label: Set EQ band level
  kind: action
  command: "[EO{output}B{band}L{level}]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number
    - name: level
      type: integer
      description: Band level in dB; range -10 to +10, 0 = flat

- id: eq_band_flat
  label: Set EQ band to flat (0 dB)
  kind: action
  command: "[EO{output}B{band}L0]"
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number

- id: eq_save_preset
  label: Save EQ settings to a preset
  kind: action
  command: "[U{unit}O{output}STP{preset}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: preset
      type: integer
      description: Preset number (1-10)

# --- EQ Filters (per band) ---
- id: eq_filter_bypass
  label: Bypass the EQ filter
  kind: action
  command: "[U{unit}O{output}B{band}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number

- id: eq_filter_highpass
  label: Enable a highpass filter
  kind: action
  command: "[U{unit}O{output}B{band}HPF{frequency}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number
    - name: frequency
      type: integer
      description: Highpass cutoff in Hz

- id: eq_filter_highshelf
  label: Enable a highshelf filter
  kind: action
  command: "[U{unit}O{output}B{band}HS{low}F{high}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number
    - name: low
      type: integer
      description: Low shelf edge in Hz (5 digits per source template)
    - name: high
      type: integer
      description: High shelf edge in Hz (5 digits per source template)

- id: eq_filter_lowpass
  label: Enable a lowpass filter
  kind: action
  command: "[U{unit}O{output}B{band}LPF{frequency}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number
    - name: frequency
      type: integer
      description: Lowpass cutoff in Hz

- id: eq_filter_lowshelf
  label: Enable a lowshelf filter
  kind: action
  command: "[U{unit}O{output}B{band}LS{low}F{high}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number
    - name: low
      type: integer
      description: Low shelf edge in Hz (2 digits per source template)
    - name: high
      type: integer
      description: High shelf edge in Hz (3 digits per source template)

- id: eq_filter_peaking
  label: Enable a peaking filter
  kind: action
  command: "[U{unit}O{output}B{band}P{gain}F{frequency}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: output
      type: integer
      description: Output number (1-16)
    - name: band
      type: integer
      description: EQ band number
    - name: gain
      type: integer
      description: Peaking gain in dB (1 digit, signed per source example)
    - name: frequency
      type: integer
      description: Peaking center frequency in Hz (3 digits per source template)

# --- Audio Override ---
- id: override_select
  label: Select an audio override, set membership and on/off status
  kind: action
  command: "[U{unit}AO{override}A{action}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Audio override number
    - name: action
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

- id: override_add_output
  label: Add an output to an audio override
  kind: action
  command: "[U{unit}AO{override}O{output}V{level}A]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Audio override number
    - name: output
      type: integer
      description: Output number (1-16)
    - name: level
      type: integer
      description: Output level in dB at the override

- id: override_set_input
  label: Set the input for an audio override
  kind: action
  command: "[U{unit}AO{override}I{input}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Audio override number
    - name: input
      type: integer
      description: Source input number

- id: override_set_priority
  label: Set priority for an audio override
  kind: action
  command: "[U{unit}AO{override}P{priority}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Audio override number
    - name: priority
      type: integer
      description: Priority level (1 is highest)

- id: override_query
  label: Query an audio override
  kind: query
  command: "[U{unit}AO{override}Q]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Audio override number

- id: override_remove_output
  label: Remove an output from an audio override
  kind: action
  command: "[U{unit}AO{override}O{output}R]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Audio override number
    - name: output
      type: integer
      description: Output number (1-16)

- id: override_clear_all
  label: Remove all members from all audio overrides
  kind: action
  command: "[U{unit}AOR]"
  params:
    - name: unit
      type: integer
      description: Unit ID

# --- Flex Port Override ---
- id: flexport_override_select
  label: Select a Flex Port override, set membership and on/off status
  kind: action
  command: "[U{unit}FPO{override}A{action}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Flex Port override number
    - name: action
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

- id: flexport_override_add_output
  label: Add an output to a Flex Port audio override
  kind: action
  command: "[U{unit}FPO{override}O{output}V{level}A]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Flex Port override number
    - name: output
      type: integer
      description: Output number (1-16)
    - name: level
      type: integer
      description: Output level in dB at the override

- id: flexport_override_set_priority
  label: Set priority for a Flex Port audio override
  kind: action
  command: "[U{unit}FPO{override}P{priority}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Flex Port override number
    - name: priority
      type: integer
      description: Priority level (overrides of the same priority override each other)

- id: flexport_override_query
  label: Query a Flex Port audio override
  kind: query
  command: "[U{unit}FPO{override}Q]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Flex Port override number

- id: flexport_override_remove_output
  label: Remove an output from a Flex Port audio override
  kind: action
  command: "[U{unit}FPO{override}O{output}R]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: override
      type: integer
      description: Flex Port override number
    - name: output
      type: integer
      description: Output number (1-16)

- id: flexport_override_clear_all
  label: Remove all members from all Flex Port overrides
  kind: action
  command: "[U{unit}FPOR]"
  params:
    - name: unit
      type: integer
      description: Unit ID

# --- Query ---
- id: query_all_settings
  label: Query all settings for a unit
  kind: query
  command: "[U{unit}XQ]"
  params:
    - name: unit
      type: integer
      description: Unit ID
  notes: Unit is unresponsive while returning the full state dump.

- id: query_all_settings_bracketed
  label: Query all settings for a unit, returned in square brackets
  kind: query
  command: "[U{unit}XQSB]"
  params:
    - name: unit
      type: integer
      description: Unit ID
  notes: "WARNING from source: if units are looped out, this could cause them to act on any unit-unspecific commands."

# --- Sound Scene Presets ---
- id: scene_add_output
  label: Add an output to a scene preset and set the volume
  kind: action
  command: "[U{unit}SP{preset}O{output}I{input}V{level}A]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number
    - name: output
      type: integer
      description: Output number (1-16)
    - name: input
      type: integer
      description: Source input number
    - name: level
      type: integer
      description: Volume level in dB

- id: scene_load_all
  label: Load scene preset on all units
  kind: action
  command: "[SP{preset}LOAD]"
  params:
    - name: preset
      type: integer
      description: Scene preset number

- id: scene_load_unit
  label: Load scene preset on one unit
  kind: action
  command: "[U{unit}SP{preset}LOAD]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number

- id: scene_set_mute
  label: Set mute on or off for a scene preset output
  kind: action
  command: "[U{unit}SP{preset}O{output}M{state}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number
    - name: output
      type: integer
      description: Output number (1-16)
    - name: state
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

- id: scene_name_all
  label: Name a scene preset on all units
  kind: action
  command: '[SP{preset}N"{name}"]'
  params:
    - name: preset
      type: integer
      description: Scene preset number
    - name: name
      type: string
      description: Preset name string

- id: scene_name_unit
  label: Name a scene preset on one unit
  kind: action
  command: '[U{unit}SP{preset}N"{name}"]'
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number
    - name: name
      type: string
      description: Preset name string

- id: scene_set_power
  label: Power an output off/on in a scene preset
  kind: action
  command: "[U{unit}SP{preset}O{output}P{state}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number
    - name: output
      type: integer
      description: Output number (1-16)
    - name: state
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

- id: scene_query
  label: Query a scene preset
  kind: query
  command: "[U{unit}SP{preset}Q]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number

- id: scene_remove_output
  label: Remove an output from a scene preset
  kind: action
  command: "[U{unit}SP{preset}O{output}R]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number
    - name: output
      type: integer
      description: Output number (1-16)

- id: scene_clear_all
  label: Remove all outputs from all scene presets on one unit
  kind: action
  command: "[U{unit}SPR]"
  params:
    - name: unit
      type: integer
      description: Unit ID

- id: scene_snapshot_remote_save
  label: Allow or prohibit scene snapshot (remote save)
  kind: action
  command: "[SPRS{state}]"
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

- id: scene_snapshot_save_all
  label: Save a scene snapshot of all outputs on all units (remote save)
  kind: action
  command: "[SP{preset}SAVE]"
  params:
    - name: preset
      type: integer
      description: Scene preset number to save into (source example uses 10)

- id: scene_snapshot_save_unit
  label: Save a scene snapshot of all outputs on one unit (remote save)
  kind: action
  command: "[U{unit}SP{preset}SAVE]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: preset
      type: integer
      description: Scene preset number to save into (source example uses 10)

# --- Standby ---
- id: standby_all
  label: Standby, all units
  kind: action
  command: "[SBY{state}]"
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on, 2 = toggle; turning on disables outputs, stops DSP, turns off screen"

- id: standby_unit
  label: Standby, one unit
  kind: action
  command: "[U{unit}SBY{state}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: state
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

- id: standby_toggle_unit
  label: Toggle standby, one unit
  kind: action
  command: "[U{unit}TRIG{state}]"
  params:
    - name: unit
      type: integer
      description: Unit ID
    - name: state
      type: integer
      description: "0 = off, 1 = on, 2 = toggle"

# --- State ---
- id: state_load
  label: Load system state from memory, one unit
  kind: action
  command: "[U{unit}LOAD]"
  params:
    - name: unit
      type: integer
      description: Unit ID

- id: state_reset
  label: Reset to factory default, one unit
  kind: action
  command: "[U{unit}RESET]"
  params:
    - name: unit
      type: integer
      description: Unit ID

- id: state_save
  label: Save system state
  kind: action
  command: "[U{unit}SAVE]"
  params:
    - name: unit
      type: integer
      description: Unit ID
  notes: There is an auto-save that saves the state 60 seconds after the last change.
```

## Feedbacks
```yaml
# Replies are wrapped in parentheses and echo the command with the result field.
- id: power_state
  type: enum
  values: [on, off]

- id: output_volume
  type: integer
  description: Volume in dB; range -80 to 0
  example: "(VO3R-20)"

- id: output_mute
  type: enum
  values: [muted, unmuted]
  example: "(VMO1)"

- id: output_balance
  type: integer
  description: Balance offset; range 0 to +80, 0 = center; sign denotes side
  example: "(BO5L40)"

- id: output_mode
  type: enum
  values: [tone, eq, lowpass, zq]
  example: "(EO2M4)"

- id: lowpass_frequency
  type: integer
  description: Crossover frequency in Hz
  example: "(EO2LP115)"

- id: tone_levels
  type: object
  description: Bass and treble levels in dB; range -12 to +12, 0 = flat
  example: "(TO2B-3T9)"

- id: eq_band_level
  type: integer
  description: Per-band EQ level in dB; range -10 to +10, 0 = flat
  example: "(EO3B1L6)"

- id: scene_preset_query
  type: object
  description: Lists all members, their settings, and the name of the preset
  example: "(U1SP2Q)"

- id: audio_override_query
  type: object
  description: Displays membership, levels, input, and priority
  example: "(UAO1Q)"

- id: flexport_override_query
  type: object
  description: Displays membership, levels, input, and priority
  example: "(U1FPO1Q)"

- id: full_settings_dump
  type: object
  description: Full state dump of unit; unit is unresponsive while returning
  example: "(U1XQ)"
```

## Variables
```yaml
# UNRESOLVED: no settable parameter that is not a discrete action exists;
# all values in the command set are part of an action's params.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for:
  - state_reset                          # resets unit to factory defaults
  - override_clear_all                   # removes all members from all audio overrides
  - flexport_override_clear_all          # removes all members from all Flex Port overrides
  - scene_clear_all                      # removes all outputs from all scene presets on a unit
interlocks: []
# Source-derived safety notes:
# - Audio Override must be programmed using the PC Setup Utility to function.
# - A high-to-low voltage transition on the system trigger input puts the SF-16M into standby;
#   a low-to-high transition wakes it (5V-24V AC/DC on trigger contacts).
# - If System Trigger or Override terminals are used, attach a ferrite bead (included) around
#   the wires near the terminal; apply separate ferrite beads to Override and System Trigger wires.
# - FlexPort pin 1 = RS-485A, pin 2 = RS-485B, pin 7 = 18V, pin 8 = Ground. Not an Ethernet port.
# - Standard serial cable (male to female) for RS-232 input to SF-16M.
# - WARNING from source: [U#XQSB] can cause looped-out units to act on any unit-unspecific commands.
```

## Notes
- Commands are ASCII strings wrapped in square brackets; replies are wrapped in parentheses.
- All commands work over RS-232 and Telnet (port 23). Telnet server allows 2 concurrent clients with a 15-minute idle timeout; crashed clients that do not send EOF hold the connection until timeout.
- Per source, only some capabilities are exposed per control interface. Source select, output volume/mute/tone are available on RS-232, Ethernet, IR, and front panel. Parametric EQ, hi-pass/low-pass filters are on RS-232, Ethernet, and front panel. Lock front panel and change Ethernet settings are RS-232 + front panel. Firmware upgrade is front panel only. Group/scene/override creation is RS-232 + front panel; control of those is RS-232 + Ethernet + IR + front panel.
- Control4 SDDP is enabled by default for seamless integration.
- Per source, "Serial commands are located on our website: www.audioauthority.com/sonaflex_tip2" — that link may contain the most current command set.
- UNRESOLVED: firmware version compatibility not stated in source.
- UNRESOLVED: voltage/current/power specifications not stated in source.
- UNRESOLVED: hex/binary command byte encodings not stated; the source uses ASCII command strings.
- UNRESOLVED: detailed parametric EQ band count and audio override count limits not stated in source.
- UNRESOLVED: max number of scene presets beyond the 10 referenced in the SAVE examples not stated in source.

## Provenance

```yaml
source_domains:
  - audioauthority.com
  - manualslib.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/752-607B_SF-16M_tech-manual_20150617.pdf
  - https://www.audioauthority.com/downloads/manuals/sf-16m_ci_manual_752-607_20130820.pdf
  - https://www.manualslib.com/manual/734530/Audio-Authority-Sf-16m.html
  - https://www.audioauthority.com/downloadlist
retrieved_at: 2026-06-03T08:14:06.587Z
last_checked_at: 2026-06-04T06:24:28.980Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:24:28.980Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions matched source structure and examples verbatim; transport parameters verified in source documentation. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "voltage/current/power specs not stated in source"
- "no settable parameter that is not a discrete action exists;"
- "source does not document unsolicited notifications."
- "no multi-step sequences described explicitly in source."
- "firmware version compatibility not stated in source."
- "voltage/current/power specifications not stated in source."
- "hex/binary command byte encodings not stated; the source uses ASCII command strings."
- "detailed parametric EQ band count and audio override count limits not stated in source."
- "max number of scene presets beyond the 10 referenced in the SAVE examples not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
