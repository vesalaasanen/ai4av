---
spec_id: admin/neothings-2nd-generation-universal
schema_version: ai4av-public-spec-v1
revision: 1
title: "Neothings NeoPro 2nd Generation Universal Matrix Switch Control Spec"
manufacturer: Neothings
model_family: "Neothings NeoPro 2RU Matrix Switch (2nd Generation Universal)"
aliases: []
compatible_with:
  manufacturers:
    - Neothings
  models:
    - "Neothings NeoPro 2RU Matrix Switch (2nd Generation Universal)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - neoprointegrator.us
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00027-C-Integrators-Guide.pdf
  - https://neoprointegrator.us/support/
retrieved_at: 2026-06-14T18:29:52.397Z
last_checked_at: 2026-06-14T19:39:43.782Z
generated_at: 2026-06-14T19:39:43.782Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact \"2nd Generation Universal\" model-name string not found verbatim in the refined source; source is the CURRENT_CAT5_Int_Guide covering the NeoPro 2RU family (Avalon, Borrego+, Concord+, Delano, Eureka+, Fallbrook, Gillespie+, Hawthorne, Imperial, Juneau, Kingman+, Lindbergh+, Ontario, Quincy+, Riverside+). Model-name match needs verification against the original PDF."
  - "TCP/IP / network control not documented in this source; only serial/USB-COM"
  - "firmware version compatibility range not stated"
  - "power/voltage/current specs not extracted (power-relevant rows: AC 90–240 VAC, 50–60 Hz, IEC320) — out of protocol scope"
  - "exact response string formats per command type not enumerated in"
  - "none additional identified in source."
  - "none - source describes no push/event mechanism."
  - "no formal confirmation-required list or interlock sequence"
  - "exact per-command response string formats (source says contents depend on command type + model) — need full CURRENT_CAT5_Int_Guide response tables"
  - "model-name match — \"2nd Generation Universal\" string not found verbatim in refined source; the refined doc covers the NeoPro 2RU family. Verify against the original PDF (CURRENT_CAT5_Int_Guide.pdf via Wayback) that it governs the target device"
  - "max input/output counts per model variant — switching params validated only against the specific model's matrix size"
  - "TCP/IP / network transport — not described in this source (serial + USB-COM only)"
  - "firmware version compatibility range"
verification:
  verdict: verified
  checked_at: 2026-06-14T19:39:43.782Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions verified against source with literal command matches; transport parameters fully supported. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Neothings NeoPro 2nd Generation Universal Matrix Switch Control Spec

## Summary
Serial (RS-232C / USB virtual COM) control spec for the Neothings NeoPro 2RU HD audio/video matrix switch family, marketed as the "2nd Generation Universal" platform. Covers audio/video routing across separate signal levels (HD video, digital audio, analog audio, composite video), per-zone volume/bass/treble, muting, 16-slot memory store/recall/edit, setup controls, and two-way query commands. Commands are ASCII wrapped in square brackets; no carriage return required (closing bracket triggers processing).

<!-- UNRESOLVED: exact "2nd Generation Universal" model-name string not found verbatim in the refined source; source is the CURRENT_CAT5_Int_Guide covering the NeoPro 2RU family (Avalon, Borrego+, Concord+, Delano, Eureka+, Fallbrook, Gillespie+, Hawthorne, Imperial, Juneau, Kingman+, Lindbergh+, Ontario, Quincy+, Riverside+). Model-name match needs verification against the original PDF. -->
<!-- UNRESOLVED: TCP/IP / network control not documented in this source; only serial/USB-COM -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: power/voltage/current specs not extracted (power-relevant rows: AC 90–240 VAC, 50–60 Hz, IEC320) — out of protocol scope -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # source: "115.2k baud"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth/login procedure described anywhere in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: [P,1] / [P,0] power commands documented
  - routable    # inferred: per-level input->output switching commands documented
  - queryable   # inferred: [?...] query commands return device state
  - levelable   # inferred: volume/bass/treble level set commands documented
```

## Actions
```yaml
# Model-letter prefix `m`: first letter of the specific model name. Per source
# Model reference table (e.g. A=Avalon, B=Borrego+, C=Concord+, D=Delano,
# E=Eureka+, F=Fallbrook, G=Gillespie+, H=Hawthorne, I=Imperial, J=Juneau,
# K=Kingman+, L=Lindbergh+, O=Ontario, Q=Quincy+, R=Riverside+). All commands
# are wrapped in square brackets [ ]; closing bracket triggers processing.
# Numbers are 1 or 2 digits (leading zeros not required). Case insensitive.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "[P,1]"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "[P,0]"
  params: []

# --- Switching (per Command Type / Mode) ---
# Structure: [mc,i,o,t]. c = Command Type; i = input (0 = disable output zone);
# o = output (0 = all zones / Party Mode); t = transition time seconds (optional).

- id: switch_all_av
  label: Switch All A/V Signals
  kind: action
  command: "[{m}X,{input},{output},{time}]"
  params:
    - { name: m, type: string, description: "First letter of model name (see Model reference)" }
    - { name: input, type: integer, description: "Input number (0 = disable selected output zone)" }
    - { name: output, type: integer, description: "Output number (0 = all zones / Party Mode)" }
    - { name: time, type: integer, description: "Optional transition time in seconds", optional: true }

- id: switch_hd_video
  label: Switch HD Video (YPbPr)
  kind: action
  command: "[{m}V,{input},{output},{time}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: input, type: integer, description: "Input number (0 = disable output zone)" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
    - { name: time, type: integer, description: "Optional transition time in seconds", optional: true }

- id: switch_digital_audio
  label: Switch Digital Audio (SPDIF)
  kind: action
  command: "[{m}D,{input},{output},{time}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: input, type: integer, description: "Input number (0 = disable output zone)" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
    - { name: time, type: integer, description: "Optional transition time in seconds", optional: true }

- id: switch_analog_audio
  label: Switch Analog Audio (L/R)
  kind: action
  command: "[{m}A,{input},{output},{time}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: input, type: integer, description: "Input number (0 = disable output zone)" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
    - { name: time, type: integer, description: "Optional transition time in seconds", optional: true }

- id: switch_composite_video
  label: Switch Composite Video
  kind: action
  command: "[{m}C,{input},{output},{time}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: input, type: integer, description: "Input number (0 = disable output zone)" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
    - { name: time, type: integer, description: "Optional transition time in seconds", optional: true }

# --- Level set (Volume / Bass / Treble) ---
# For L/B/T: i = value 0-99 (flat = 50). Time param ignored for B & T.

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "[{m}L,{level},{output},{time}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: level, type: integer, description: "Volume level 0-99" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
    - { name: time, type: integer, description: "Optional transition time in seconds (smooth fade)", optional: true }

- id: set_bass_level
  label: Set Bass Level
  kind: action
  command: "[{m}B,{level},{output}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: level, type: integer, description: "Bass level 0-99 (50 = flat; >50 boost, <50 attenuate)" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }

- id: set_treble_level
  label: Set Treble Level
  kind: action
  command: "[{m}T,{level},{output}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: level, type: integer, description: "Treble level 0-99 (50 = flat; >50 boost, <50 attenuate)" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }

# --- Volume functions (affect analog audio only) ---
# Structure: [mL,f,n]. f = function mnemonic; n = output number.

- id: absolute_mute
  label: Absolute Mute
  kind: action
  command: "[{m}LM0,{output}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
  notes: "Mutes output to volume level 0. Toggle - same command un-mutes. Any volume change also un-mutes."

- id: partial_mute
  label: Partial Mute
  kind: action
  command: "[{m}LMP,{output}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
  notes: "Mutes output to 10% of current volume. Toggle - same command un-mutes."

- id: volume_up
  label: Volume Up
  kind: action
  command: "[{m}LU,{output}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
  notes: "Increase volume by one step."

- id: volume_down
  label: Volume Down
  kind: action
  command: "[{m}LD,{output}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
    - { name: output, type: integer, description: "Output number (0 = all zones)" }
  notes: "Decrease volume by one step."

# --- Memory (16 locations) ---
# Structure: [M,x,n]. x = function; n = 1-16.

- id: memory_store
  label: Memory Store
  kind: action
  command: "[M,S,{slot}]"
  params:
    - { name: slot, type: integer, description: "Memory location 1-16" }
  notes: "Stores current volume/bass/treble and all input-output combinations."

- id: memory_recall
  label: Memory Recall
  kind: action
  command: "[M,R,{slot}]"
  params:
    - { name: slot, type: integer, description: "Memory location 1-16" }

- id: memory_view
  label: Memory View
  kind: query
  command: "[M,V,{slot}]"
  params:
    - { name: slot, type: integer, description: "Memory location 1-16" }
  notes: "View memory slot contents via serial."

- id: memory_clear
  label: Memory Clear
  kind: action
  command: "[M,C,{slot}]"
  params:
    - { name: slot, type: integer, description: "Memory location 1-16" }

- id: memory_edit
  label: Memory Edit
  kind: action
  command: "[M,E,{slot}]"
  params:
    - { name: slot, type: integer, description: "Memory location 1-16" }
  notes: "Invoke memory edit; follow with a group command {[...]} containing switch/volume/tone commands to store (not executed)."

# --- Setup (parameterized by enum value) ---
# Structure: [S,x,n].

- id: set_led
  label: Set Front Panel LED
  kind: action
  command: "[S,L,{state}]"
  params:
    - { name: state, type: "integer[0,1]", description: "0 = OFF, 1 = ON" }

- id: set_ir_control
  label: Set IR Control
  kind: action
  command: "[S,R,{state}]"
  params:
    - { name: state, type: "integer[0,1]", description: "0 = IR OFF, 1 = IR ON" }

- id: set_front_panel_buttons
  label: Set Front Panel Buttons
  kind: action
  command: "[S,B,{state}]"
  params:
    - { name: state, type: "integer[0,1]", description: "0 = OFF, 1 = ON" }

- id: set_verbosity
  label: Set Verbosity
  kind: action
  command: "[S,V,{state}]"
  params:
    - { name: state, type: "integer[0,1]", description: "0 = OFF (serial-only echo), 1 = ON (echo all)" }
  notes: "Default ON. Memory and mute commands always echo serial responses regardless of this setting."

- id: set_display_brightness
  label: Set Display Brightness
  kind: action
  command: "[S,D,{percent}]"
  params:
    - { name: percent, type: "integer[25,50,75,100]", description: "Brightness percent (25/50/75/100)" }

- id: set_front_panel_sensitivity
  label: Set Front Panel Sensitivity
  kind: action
  command: "[S,S,{level}]"
  params:
    - { name: level, type: "string[L,M,H]", description: "L = LOW, M = MEDIUM, H = HIGH" }

- id: set_power_up_mode
  label: Set Power-Up Mode
  kind: action
  command: "[S,A,{mode}]"
  params:
    - { name: mode, type: "integer[0,1]", description: "0 = STANDBY on power up, 1 = ON on power up" }

# --- Queries ([?...]) ---

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "[?V]"
  params: []

- id: query_power_status
  label: Query Power Status
  kind: query
  command: "[?P]"
  params: []

- id: query_setup_values
  label: Query Setup Values
  kind: query
  command: "[?S]"
  params: []

- id: query_all_matrix_state
  label: Query All Matrix State
  kind: query
  command: "[?{m}]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_hd_video_matrix
  label: Query HD Video (YPbPr) Matrix State
  kind: query
  command: "[?{m}V]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_digital_audio_matrix
  label: Query Digital Audio Matrix State
  kind: query
  command: "[?{m}D]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_analog_audio_matrix
  label: Query Analog Audio Matrix State
  kind: query
  command: "[?{m}A]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_composite_video_matrix
  label: Query Composite Video Matrix State
  kind: query
  command: "[?{m}C]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_volume_levels
  label: Query Audio Volume Levels
  kind: query
  command: "[?{m}L]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_bass_levels
  label: Query Bass Levels
  kind: query
  command: "[?{m}B]"
  params:
    - { name: m, type: string, description: "First letter of model name" }

- id: query_treble_levels
  label: Query Treble Levels
  kind: query
  command: "[?{m}T]"
  params:
    - { name: m, type: string, description: "First letter of model name" }
```

## Feedbacks
```yaml
# Valid-command response: the matrix returns a status echo in curly brackets { }
# reflecting current state pertaining to the command. Format/contents vary by
# command type and model. Responses can be re-sent as commands or used as
# memory-edit input.
- id: command_status_response
  type: string
  description: "Status echo wrapped in { } returned for each valid command; one response per command inside a group."

- id: error_response
  type: enum
  values: ["E"]
  description: "Echoed bad command plus [E] for invalid parameters / syntax errors."

# UNRESOLVED: exact response string formats per command type not enumerated in
# the refined source (source states contents 'depend on the type of command
# and the model'). Need full CURRENT_CAT5_Int_Guide response tables to populate
# per-command feedback schemas.
```

## Variables
```yaml
# Discrete settable parameters already enumerated as Actions (volume/bass/treble
# level, setup values). No additional continuous variables documented.
# UNRESOLVED: none additional identified in source.
```

## Events
```yaml
# No unsolicited notifications documented. The matrix only echoes in response
# to commands (serial does not echo sent characters except on error).
# UNRESOLVED: none - source describes no push/event mechanism.
```

## Macros
```yaml
# Group command: wrap multiple commands in curly brackets to receive a single
# consolidated response (one response per command type inside the group).
# Also used for memory-edit payload input.
- id: group_command
  label: Group Command
  kind: macro
  command: "{[{cmd1}][{cmd2}][{cmd3}]}"
  params:
    - { name: cmds, type: string, description: "One or more bracketed commands to batch" }
  notes: "Up to 32 commands may be sent without inter-command delay. For >32 commands wait 500 ms before sending."

# Documented paging example macro (verbatim from source):
- id: paging_macro
  label: Paging Sequence (documented example)
  kind: macro
  steps:
    - "[M,S,1]"                # save current config to memory slot 1
    - "{[BA,1,0][BL,99,0]}"    # route input 1 to all zones, set all volumes to 99
    - "[M,R,1]"                # restore saved config
  notes: "Model letter shown as B (Borrego+) in source example; substitute target model's first letter."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: standby_mode_interlock
    description: >
      In Standby Mode all outputs are virtually disconnected and volumes set to 0.
      Commands from the serial port still execute but are NOT saved - on power-up
      the switch reloads the most recent pre-standby state and volume levels.
      One-way commands may be sent regardless of matrix state (including Standby).
    affects: [all_actions]
  - id: ac_input_connect_last
    description: "AC 90-240 VAC (50-60 Hz) via IEC320 inlet must be connected LAST, after all I/O cables."
# UNRESOLVED: no formal confirmation-required list or interlock sequence
# beyond the standby note documented in source.
```

## Notes
- **Baud is 115200, not 9600.** Source explicitly: "115.2k baud, no parity, 8 data, 1 stop. No hardware flow control."
- **Serial wired DCE** — connect to computer/control system with a straight-through cable (not null-modem). Same cable ships with the switch.
- **USB presents as virtual COM port** with identical serial settings (115.2k 8N1, no flow). Driver software required.
- **No carriage return required** — closing `]` triggers command processing. Characters outside `[ ]` are discarded.
- **Case insensitive** — upper/lowercase have identical effect.
- **Spaces forbidden inside brackets** — they generate `[E]`.
- **Numbers 1 or 2 digits**, leading zeros not required.
- **Command delay:** none required for up to 32 commands; wait 500 ms before sending >32.
- **Verbosity default ON** — echoes responses to all commands (serial/IR/front panel). OFF restricts echo to serial only. Memory + mute commands always echo serial responses regardless of setting.
- **Model-letter prefix** is mandatory on all switching/level/volume commands and on the model-scoped queries. See Model reference table in source for the full letter map (A/B/C/D/E/F/G/H/I/J/K/L/O/Q/R for the 15 listed models).
- **Legacy protocol:** some models support legacy serial codes; legacy manual lives at neoprointegrator.com (now only via Wayback). Not necessary unless replacing an identical model name/config.
- **Audio transition time** (`t` param) smooths volume changes to minimize "pop". For switching commands it fades volume down, switches, fades back up. For V/D/C commands no fade — delays half the time param then switches. B/T commands ignore the time param entirely.

<!-- UNRESOLVED: exact per-command response string formats (source says contents depend on command type + model) — need full CURRENT_CAT5_Int_Guide response tables -->
<!-- UNRESOLVED: model-name match — "2nd Generation Universal" string not found verbatim in refined source; the refined doc covers the NeoPro 2RU family. Verify against the original PDF (CURRENT_CAT5_Int_Guide.pdf via Wayback) that it governs the target device -->
<!-- UNRESOLVED: max input/output counts per model variant — switching params validated only against the specific model's matrix size -->
<!-- UNRESOLVED: TCP/IP / network transport — not described in this source (serial + USB-COM only) -->
<!-- UNRESOLVED: firmware version compatibility range -->

## Provenance

```yaml
source_domains:
  - neoprointegrator.us
source_urls:
  - https://neoprointegrator.us/wp-content/uploads/2024/01/DOC42-00027-C-Integrators-Guide.pdf
  - https://neoprointegrator.us/support/
retrieved_at: 2026-06-14T18:29:52.397Z
last_checked_at: 2026-06-14T19:39:43.782Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:39:43.782Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions verified against source with literal command matches; transport parameters fully supported. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact \"2nd Generation Universal\" model-name string not found verbatim in the refined source; source is the CURRENT_CAT5_Int_Guide covering the NeoPro 2RU family (Avalon, Borrego+, Concord+, Delano, Eureka+, Fallbrook, Gillespie+, Hawthorne, Imperial, Juneau, Kingman+, Lindbergh+, Ontario, Quincy+, Riverside+). Model-name match needs verification against the original PDF."
- "TCP/IP / network control not documented in this source; only serial/USB-COM"
- "firmware version compatibility range not stated"
- "power/voltage/current specs not extracted (power-relevant rows: AC 90–240 VAC, 50–60 Hz, IEC320) — out of protocol scope"
- "exact response string formats per command type not enumerated in"
- "none additional identified in source."
- "none - source describes no push/event mechanism."
- "no formal confirmation-required list or interlock sequence"
- "exact per-command response string formats (source says contents depend on command type + model) — need full CURRENT_CAT5_Int_Guide response tables"
- "model-name match — \"2nd Generation Universal\" string not found verbatim in refined source; the refined doc covers the NeoPro 2RU family. Verify against the original PDF (CURRENT_CAT5_Int_Guide.pdf via Wayback) that it governs the target device"
- "max input/output counts per model variant — switching params validated only against the specific model's matrix size"
- "TCP/IP / network transport — not described in this source (serial + USB-COM only)"
- "firmware version compatibility range"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
