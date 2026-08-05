---
spec_id: admin/tvone-cm2-aud-2in-3out
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE CORIOmaster2 CM2-AUD-2IN-3OUT Audio Module Control Spec"
manufacturer: tvONE
model_family: CM2-AUD-2IN-3OUT
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - CM2-AUD-2IN-3OUT
  firmware: "\"G502 (System API 5.2.16385 or above)\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.tvone.com
source_urls:
  - "https://api.tvone.com/past-releases/products/cm2-series/coriomaster2/tvONE%20CORIOmaster2%20Commands_v502.0.1.pdf"
retrieved_at: 2026-07-16T18:22:48.867Z
last_checked_at: 2026-07-22T01:34:51.592Z
generated_at: 2026-07-22T01:34:51.592Z
firmware_coverage: "\"G502 (System API 5.2.16385 or above)\""
protocol_coverage: []
known_gaps:
  - Slot13.Carddata
  - "module-level voltage/current/power specs not stated in source"
  - "detailed audio connector/format specs (balanced/unbalanced, level ref) not in this command reference"
  - "line terminator / EOL character(s) not explicitly stated in source"
  - "Ethernet alternative (default IP 192.168.0.10, port 10001) is documented but out of scope for this serial spec. Serial+Ethernet cannot be used concurrently."
  - "AudioMode / AudioFollowWindow / AudioSource / AudioVolume on outputs are"
  - "no explicit multi-step audio sequences documented in source for this module."
  - "no module-specific safety/interlock/power-sequencing warnings found in source."
  - "serial EOL/terminator characters not stated in source"
  - "precise module power/voltage/current ratings not in this command reference"
  - "audio connector type, impedance, nominal reference level not in this command reference"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:34:51.592Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions and every transport value match the Audio Module section and top-level session/event commands verbatim; only the Carddata stub documented as Not supported is unrepresented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-16
---

# tvONE CORIOmaster2 CM2-AUD-2IN-3OUT Audio Module Control Spec

## Summary
The CM2-AUD-2IN-3OUT is an audio I/O module for the tvONE CORIOmaster2 (CM2-547) chassis, providing 2 audio inputs and 3 audio outputs. It is installed in Slot13 and controlled via the CORIOmax text command-line API over a serial (RS-232) connection (Ethernet also supported but not concurrently with serial). Control covers per-input level/mute/enable and per-output enable/mute plus read-only audio routing attributes driven from the canvas.

<!-- UNRESOLVED: module-level voltage/current/power specs not stated in source -->
<!-- UNRESOLVED: detailed audio connector/format specs (balanced/unbalanced, level ref) not in this command reference -->

## Transport
```yaml
# Source documents BOTH RS-232 and Ethernet, but states they may NOT be used
# concurrently. This spec targets the serial (RS-232C) interface per known protocol.
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: line terminator / EOL character(s) not explicitly stated in source
auth:
  # Login is REQUIRED before issuing commands (Login() returns "!Info : User <name> Logged In").
  type: credentials  # stated: username/password login procedure
  default_username: admin  # stated default
  default_password: adminpw  # stated default
```
<!-- UNRESOLVED: Ethernet alternative (default IP 192.168.0.10, port 10001) is documented but out of scope for this serial spec. Serial+Ethernet cannot be used concurrently. -->

## Traits
```yaml
- levelable   # inferred: AudioLevel (-20..+20 dB) and AudioVolume (0-100%) present
- queryable   # inferred: read-only Status / AudioMode / AudioSource queries present
```

## Actions
```yaml
# Module sits in Slot13 of CM2-547 (stated: "CM-AUD-2IN-3OUT supported in Slot13 of CM2-547").
# Aliases: Slot13.In<n> == s13i<n>; Slot13.Out<n> == s13o<n>.
# Read ("Get") is performed by sending the property path with no "= value"; write appends " = <value>".

# --- Top-level / session (required for any command) ---
- id: login
  label: Login
  kind: action
  command: "Login({username},{password})"
  params:
    - name: username
      type: string
      description: Account username (default admin)
    - name: password
      type: string
      description: Account password (default adminpw)

- id: logout
  label: Logout
  kind: action
  command: "Logout"
  params: []

# --- Card level (Slot13) ---
- id: slot_list
  label: List Slot13 Properties
  kind: query
  command: "Slot13"
  params: []

- id: cardtype_query
  label: Query Card Type
  kind: query
  command: "Slot13.Cardtype"
  params: []

# --- Input channel commands (2 inputs: In1, In2) ---
- id: input_list
  label: List Input Properties
  kind: query
  command: "Slot13.In{input}"
  params:
    - name: input
      type: integer
      description: Input number (1-2)

- id: input_fullname_query
  label: Query Input Full Name
  kind: query
  command: "Slot13.In{input}.FullName"
  params:
    - name: input
      type: integer
      description: Input number (1-2)

- id: input_status_query
  label: Query Input Status
  kind: query
  command: "Slot13.In{input}.Status"
  params:
    - name: input
      type: integer
      description: Input number (1-2)

- id: input_alias_set
  label: Set Input Alias
  kind: action
  command: "Slot13.In{input}.Alias = {alias}"
  params:
    - name: input
      type: integer
      description: Input number (1-2)
    - name: alias
      type: string
      description: Alias name (setting to an existing alias NULLs the other)

- id: input_audio_level_set
  label: Set Input Audio Level
  kind: action
  command: "Slot13.In{input}.AudioLevel = {level}"
  params:
    - name: input
      type: integer
      description: Input number (1-2)
    - name: level
      type: integer
      description: Audio level in dB, -20 to +20 in steps of 1 (default 0)

- id: input_audio_level_query
  label: Query Input Audio Level
  kind: query
  command: "Slot13.In{input}.AudioLevel"
  params:
    - name: input
      type: integer
      description: Input number (1-2)

- id: input_audio_mute_set
  label: Set Input Audio Mute
  kind: action
  command: "Slot13.In{input}.AudioMute = {state}"
  params:
    - name: input
      type: integer
      description: Input number (1-2)
    - name: state
      type: string
      description: "On | Off (default Off)"

- id: input_audio_mute_query
  label: Query Input Audio Mute
  kind: query
  command: "Slot13.In{input}.AudioMute"
  params:
    - name: input
      type: integer
      description: Input number (1-2)

- id: input_audio_enable_set
  label: Set Input Audio Enable
  kind: action
  command: "Slot13.In{input}.AudioEnable = {state}"
  params:
    - name: input
      type: integer
      description: Input number (1-2)
    - name: state
      type: string
      description: "On | Off (default On)"

- id: input_audio_enable_query
  label: Query Input Audio Enable
  kind: query
  command: "Slot13.In{input}.AudioEnable"
  params:
    - name: input
      type: integer
      description: Input number (1-2)

# --- Output channel commands (3 outputs: Out1, Out2, Out3) ---
- id: output_list
  label: List Output Properties
  kind: query
  command: "Slot13.Out{output}"
  params:
    - name: output
      type: integer
      description: Output number (1-3)

- id: output_fullname_query
  label: Query Output Full Name
  kind: query
  command: "Slot13.Out{output}.FullName"
  params:
    - name: output
      type: integer
      description: Output number (1-3)

- id: output_status_query
  label: Query Output Status
  kind: query
  command: "Slot13.Out{output}.Status"
  params:
    - name: output
      type: integer
      description: Output number (1-3). Always UNKNOWN for this card.
  # Note from source: Status is always UNKNOWN for the CM2-AUD-2IN-3OUT card.

- id: output_alias_set
  label: Set Output Alias
  kind: action
  command: "Slot13.Out{output}.Alias = {alias}"
  params:
    - name: output
      type: integer
      description: Output number (1-3)
    - name: alias
      type: string
      description: Alias name (setting to an existing alias NULLs the other)

- id: output_layout_query
  label: Query Output Layout
  kind: query
  command: "Slot13.Out{output}.Layout"
  params:
    - name: output
      type: integer
      description: Output number (1-3). Read-only; indicates associated Canvas/Layout.

- id: output_audio_enable_set
  label: Set Output Audio Enable
  kind: action
  command: "Slot13.Out{output}.AudioEnable = {state}"
  params:
    - name: output
      type: integer
      description: Output number (1-3)
    - name: state
      type: string
      description: "On | Off (default On). Enables embedded audio independent of canvas."

- id: output_audio_enable_query
  label: Query Output Audio Enable
  kind: query
  command: "Slot13.Out{output}.AudioEnable"
  params:
    - name: output
      type: integer
      description: Output number (1-3)

- id: output_audio_mode_query
  label: Query Output Audio Mode
  kind: query
  command: "Slot13.Out{output}.AudioMode"
  params:
    - name: output
      type: integer
      description: Output number (1-3). Read-only (set via canvas menu). FromSource | FollowWindow.

- id: output_audio_follow_window_query
  label: Query Output Audio Follow Window
  kind: query
  command: "Slot13.Out{output}.AudioFollowWindow"
  params:
    - name: output
      type: integer
      description: Output number (1-3). Read-only (set via canvas menu). Window ID.

- id: output_audio_source_query
  label: Query Output Audio Source
  kind: query
  command: "Slot13.Out{output}.AudioSource"
  params:
    - name: output
      type: integer
      description: Output number (1-3). Read-only (set via canvas menu). e.g. NULL or SlotX.InY.

- id: output_audio_volume_query
  label: Query Output Audio Volume
  kind: query
  command: "Slot13.Out{output}.AudioVolume"
  params:
    - name: output
      type: integer
      description: Output number (1-3). Read-only (set via canvas menu). 0-100% (default 100).

- id: output_audio_mute_set
  label: Set Output Audio Mute
  kind: action
  command: "Slot13.Out{output}.AudioMute = {state}"
  params:
    - name: output
      type: integer
      description: Output number (1-3)
    - name: state
      type: string
      description: "On | Off (default Off). Mutes audio independent of canvas."

- id: output_audio_mute_query
  label: Query Output Audio Mute
  kind: query
  command: "Slot13.Out{output}.AudioMute"
  params:
    - name: output
      type: integer
      description: Output number (1-3)

# --- Event subscription (output audio routing notifications) ---
- id: add_events
  label: Subscribe To Event Category
  kind: action
  command: "AddEvents({eventCategory})"
  params:
    - name: eventCategory
      type: string
      description: "e.g. OUTPUT (delivers AUDIO_FOLLOW_WINDOW_CHANGED / PROPERTY_CHANGED)"

- id: remove_events
  label: Unsubscribe From Event Category
  kind: action
  command: "RemoveEvents({eventCategory})"
  params:
    - name: eventCategory
      type: string
      description: "e.g. OUTPUT"
```

## Feedbacks
```yaml
- id: input_status
  type: enum
  values: [OK, INVALID]
  # source: Slot13.In<n>.Status

- id: input_audio_mute
  type: enum
  values: [On, Off]

- id: input_audio_enable
  type: enum
  values: [On, Off]

- id: input_audio_level
  type: integer
  # source: Slot13.In<n>.AudioLevel (dB, -20..+20)

- id: output_status
  type: enum
  values: [UNKNOWN]
  # source: Slot13.Out<n>.Status - always UNKNOWN for this card

- id: output_audio_enable
  type: enum
  values: [On, Off]

- id: output_audio_mute
  type: enum
  values: [On, Off]

- id: output_audio_mode
  type: enum
  values: [FromSource, FollowWindow]

- id: output_audio_volume
  type: integer
  # source: Slot13.Out<n>.AudioVolume (0-100%)

- id: output_audio_source
  type: string
  # source: Slot13.Out<n>.AudioSource (NULL or SlotX.InY)

- id: cardtype
  type: enum
  values: ["Audio 2-in 3-out"]
```

## Variables
```yaml
- id: input_alias
  type: string
  description: Alias name for each input (Slot13.In<n>.Alias)
  params:
    - name: input
      type: integer
      description: Input number (1-2)

- id: output_alias
  type: string
  description: Alias name for each output (Slot13.Out<n>.Alias)
  params:
    - name: output
      type: integer
      description: Output number (1-3)

# UNRESOLVED: AudioMode / AudioFollowWindow / AudioSource / AudioVolume on outputs are
# read-only at the module level (source: "Read only, set via canvas menu"). They are
# writable via Canvas<n>.Audio* properties on the parent chassis, outside this module spec.
```

## Events
```yaml
- id: output_audio_follow_window_changed
  description: "Raised when an output's follow-window audio routing changes. Subscribe via AddEvents(OUTPUT)."
  format: "!Event OUTPUT,AUDIO_FOLLOW_WINDOW_CHANGED,<details>"

- id: output_property_changed
  description: "Generic output property change notification (includes audio props). Subscribe via AddEvents(OUTPUT)."
  format: "!Event OUTPUT,PROPERTY_CHANGED,<output>,<property>,<value>"

- id: output_status_group
  description: "Output status group event. Subscribe via AddEvents(OUTPUT)."
  format: "!Event OUTPUT,STATUS_GROUP,<output>,<property>,<value>"

- id: input_status_group
  description: "Input property change (e.g. Status, Audio). Subscribe via AddEvents(INPUT)."
  format: "!Event INPUT,STATUS_GROUP,<input>,<property>,<value>"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step audio sequences documented in source for this module.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Serial and Ethernet control cannot be used concurrently; only one controlling PC at a time."
  - "Login is required before commands are accepted."
# UNRESOLVED: no module-specific safety/interlock/power-sequencing warnings found in source.
```

## Notes
- The CM2-AUD-2IN-3OUT card is supported only in Slot13 of the CM2-547 chassis (stated in source).
- Command syntax is the CORIOmax text API: send a property path to read it, append ` = <value>` to write. Methods use trailing `()`. Responses are echoed with `!Done <path>` and info lines prefixed `!Info :` / `//`.
- Aliases: `Slot13.In<n>` ≡ `s13i<n>`; `Slot13.Out<n>` ≡ `s13o<n>`.
- Output audio routing/volume/source/mode are read-only at the module level — they are driven by the parent Canvas (`Canvas<n>.Audio*`), which is outside this module-only spec.
- Document baseline: "Document version 502.0.1, System API version 5.2.16385 or above, Firmware version G502".
<!-- UNRESOLVED: serial EOL/terminator characters not stated in source -->
<!-- UNRESOLVED: precise module power/voltage/current ratings not in this command reference -->
<!-- UNRESOLVED: audio connector type, impedance, nominal reference level not in this command reference -->

## Provenance

```yaml
source_domains:
  - api.tvone.com
source_urls:
  - "https://api.tvone.com/past-releases/products/cm2-series/coriomaster2/tvONE%20CORIOmaster2%20Commands_v502.0.1.pdf"
retrieved_at: 2026-07-16T18:22:48.867Z
last_checked_at: 2026-07-22T01:34:51.592Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:34:51.592Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions and every transport value match the Audio Module section and top-level session/event commands verbatim; only the Carddata stub documented as Not supported is unrepresented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- Slot13.Carddata
- "module-level voltage/current/power specs not stated in source"
- "detailed audio connector/format specs (balanced/unbalanced, level ref) not in this command reference"
- "line terminator / EOL character(s) not explicitly stated in source"
- "Ethernet alternative (default IP 192.168.0.10, port 10001) is documented but out of scope for this serial spec. Serial+Ethernet cannot be used concurrently."
- "AudioMode / AudioFollowWindow / AudioSource / AudioVolume on outputs are"
- "no explicit multi-step audio sequences documented in source for this module."
- "no module-specific safety/interlock/power-sequencing warnings found in source."
- "serial EOL/terminator characters not stated in source"
- "precise module power/voltage/current ratings not in this command reference"
- "audio connector type, impedance, nominal reference level not in this command reference"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
