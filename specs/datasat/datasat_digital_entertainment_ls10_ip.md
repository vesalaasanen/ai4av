---
spec_id: admin/datasat-ls10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Datasat LS10 Control Spec"
manufacturer: Datasat
model_family: LS10
aliases: []
compatible_with:
  manufacturers:
    - Datasat
  models:
    - LS10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/57/ls10/207670/tn-h802-rev-a2-ls10-remote-command-api.pdf
retrieved_at: 2026-06-30T10:14:15.945Z
last_checked_at: 2026-07-07T11:32:13.412Z
generated_at: 2026-07-07T11:32:13.412Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated in source"
  - "baud rate not stated in source (only \"desired baud rate\" mentioned)"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "no additional settable variables beyond those expressed as action parameters"
  - "source documents no unsolicited notifications"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:32:13.412Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions have literal command matches in source; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Datasat LS10 Control Spec

## Summary
Remote command API for Datasat LS10 audio processor. Commands transport over RS-232 or TCP/IP (port 14500) as ASCII text framed by `@COMMAND [args]<CR>`. Auth via `AUTH <password>` required when NetCmd password set; otherwise inquiry commands open.

<!-- UNRESOLVED: firmware version range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 14500
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (only "desired baud rate" mentioned)
  data_bits: 8
  parity: null     # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: none
auth:
  type: password
  notes: "AUTH command with NetCmd password unlocks operator-level commands; valid for duration of TCP connection. Inquiry commands (SYSTEM, IDENTIFY) operate without password."
```

## Traits
```yaml
- powerable   # inferred from POWER command
- routable    # inferred from INPUT select command
- queryable   # inferred from SYSTEM/IDENTIFY/MODEL/SERIALNO/MAC/VIDRES/etc. query commands
- levelable   # inferred from VOLUME/MUTED/POSTSTEREOGAIN commands
```

## Actions
```yaml
# Commands prefixed with @ and terminated by <CR> (0x0D).

- id: auth
  label: Authorization
  kind: action
  command: "@AUTH {password}\r"
  params:
    - name: password
      type: string
      description: NetCmd or Setup level password

- id: select_input
  label: Input Selection
  kind: action
  command: "@INPUT {input}\r"
  params:
    - name: input
      type: enum
      values: ["Stereo 1", "Stereo 2", "USB", "TosLink 1", "TosLink 2", "SPDIF 1", "SPDIF 2", "HDMI 1", "HDMI 2", "HDMI 3", "HDMI 4", "HDMI 5", "HDMI 6", "HDMI 7", "HDMI 8", "eARC"]

- id: eq_select
  label: EQ Selection
  kind: action
  command: "@EQSET {eq}\r"
  params:
    - name: eq
      type: enum
      values: [EQ1, EQ2]

- id: power
  label: Standby Power
  kind: action
  command: "@POWER {mode}\r"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0 = power off/sleep, 1 = operating (requires 15s)"

- id: run_macro
  label: Execute Macro
  kind: action
  command: "@RUNMACRO {macro}\r"
  params:
    - name: macro
      type: string

- id: volume_set
  label: Master Volume Level
  kind: action
  command: "@VOLUME {value}\r"
  params:
    - name: value
      type: integer
      description: "Volume in negative tenths dB, 0 (-0dB) to 700 (-70.0dB). Increments of 5 (0.5dB). Prefix with + or - to increment/decrement."

- id: mute
  label: Master Volume Mute
  kind: action
  command: "@MUTED {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "+"]
      description: "0 = unmute, 1 = mute, + = toggle"

- id: noise_sequencer
  label: Channel Noise Sequencer
  kind: action
  command: "@NOISESEQ {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0 = off, 1 = auto sequence, 2 = manual, 3 = channel step"

- id: decoder_post_mode
  label: Post Processing Mode
  kind: action
  command: "@DECODERPOST {mode}\r"
  params:
    - name: mode
      type: enum
      values: ["0", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
      description: "0=None, 3=DTS Neo:X, 4=PLII/PLIIx, 5=PLIIz, 6=Auro-3D, 7=Dolby Surround, 8=DTS Neural:X, 9=Stereo Surround, 10=Auto 1, 11=Auto 2"

- id: neox_mode
  label: Neo:X Mode
  kind: action
  command: "@NEOXMODE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2"]
      description: "0=Cinema, 1=Music, 2=Game"

- id: neox_lfe
  label: Generate Subwoofer with Neo:X
  kind: action
  command: "@NEOXLFE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]

- id: dtsx_dialog_set
  label: DTS:X Dialog Boost (set)
  kind: action
  command: "@DTSXDIALOG {n}\r"
  params:
    - name: n
      type: integer
      description: Gain in dB (0 to 6)

- id: dtsx_dialog_inc
  label: DTS:X Dialog Boost (increment)
  kind: action
  command: "@DTSXDIALOG {sign}\r"
  params:
    - name: sign
      type: enum
      values: ["+", "-"]

- id: dpl2_mode
  label: Pro Logic II/IIx Mode
  kind: action
  command: "@DPL2MODE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "2", "3", "5"]
      description: "0=ProLogic, 2=Music, 3=Movie, 5=DD EX"

- id: dpl2_dimension
  label: Dimension for PLIIx Music
  kind: action
  command: "@DPL2DIM {dim}\r"
  params:
    - name: dim
      type: integer
      description: -7 to +7

- id: dpl2_center_width
  label: Center Width for PLIIx Music
  kind: action
  command: "@DPL2CW {cw}\r"
  params:
    - name: cw
      type: integer
      description: "0 to 7 (3=neutral, 7=phantom center)"

- id: dpl2_panorama
  label: Panorama for PLIIx Music
  kind: action
  command: "@DPL2PANO {pano}\r"
  params:
    - name: pano
      type: enum
      values: ["0", "1"]

- id: dpl2_height_gain
  label: Height Gain for PLIIz
  kind: action
  command: "@DPL2HEGAIN {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2"]
      description: "0=Low, 1=Mid, 2=High"

- id: auro_strength
  label: Auro-3D Strength
  kind: action
  command: "@AUROSTRENGTH {value}\r"
  params:
    - name: value
      type: integer
      description: "1-16 (16 highest)"

- id: auro_preset
  label: Auro-3D Preset
  kind: action
  command: "@AUROPRESET {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0=Small, 1=Medium, 2=Large, 3=Speech"

- id: auro_listening_mode
  label: Auro-3D Listening Mode
  kind: action
  command: "@AUROLM {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0=Native, 1=Stereo, 2=Surround, 3=Auro-3D"

- id: dsu_center_spread
  label: Dolby Surround Upmixer Center Spread
  kind: action
  command: "@DSUCENTERSPREAD {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]

- id: downsample_for_dsu
  label: Downsample for Dolby Surround Upmix
  kind: action
  command: "@DOWNSAMPLEFORDSU {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]

- id: truehd_drc
  label: Dolby DRC Setting
  kind: action
  command: "@TRUEHDDRC {drc}\r"
  params:
    - name: drc
      type: enum
      values: ["0", "1", "2"]
      description: "0=DRC Off, 1=On/TrueHD-Auto, 2=DRC On"

- id: post_stereo_gain
  label: Post Stereo Gain
  kind: action
  command: "@POSTSTEREOGAIN {n}\r"
  params:
    - name: n
      type: integer
      description: Attenuation in dB (-20 to 0)

- id: dts_lfe_boost
  label: DTS LFE Boost
  kind: action
  command: "@DECODERDTSLFEBOOST {dtslfe}\r"
  params:
    - name: dtslfe
      type: enum
      values: ["0", "1"]

- id: pcm_lfe_boost
  label: PCM LFE Boost
  kind: action
  command: "@DECODERPCMLFEBOOST {pcmlfe}\r"
  params:
    - name: pcmlfe
      type: enum
      values: ["0", "1"]

- id: dd_lfe_boost
  label: Dolby LFE Boost
  kind: action
  command: "@DECODERDDLFEBOOST {ddlfe}\r"
  params:
    - name: ddlfe
      type: enum
      values: ["0", "1"]

- id: decstream_query
  label: Decoder Stream
  kind: query
  command: "@DECSTREAM\r"
  params: []

- id: decchans_query
  label: Decoder Channels
  kind: query
  command: "@DECCHANS\r"
  params: []

- id: input_names_query
  label: List Generic Input Names
  kind: query
  command: "@INPUTNAMES\r"
  params: []

- id: inp_names_query
  label: List Assigned Input Names
  kind: query
  command: "@INPNAMES\r"
  params: []

- id: macro_names_query
  label: List Macro Names
  kind: query
  command: "@MACRONAMES\r"
  params: []

- id: system_query
  label: System Information
  kind: query
  command: "@SYSTEM\r"
  params: []

- id: identify_query
  label: Identify
  kind: query
  command: "@IDENTIFY\r"
  params: []

- id: model_query
  label: Model
  kind: query
  command: "@MODEL\r"
  params: []

- id: serial_no_query
  label: Serial Number
  kind: query
  command: "@SERIALNO\r"
  params: []

- id: mac_query
  label: MAC Address
  kind: query
  command: "@MAC\r"
  params: []

- id: vidres_query
  label: Video Resolution
  kind: query
  command: "@VIDRES\r"
  params: []

- id: vidprot_query
  label: Video Protection
  kind: query
  command: "@VIDPROT\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["0", "1"]
  description: "0 = off/sleep, 1 = operating"

- id: current_input
  type: string
  description: "Echoed INPUT <name><CR>"

- id: volume_level
  type: integer
  description: "0 to 700 (tenths of dB below 0)"

- id: mute_state
  type: enum
  values: ["0", "1"]

- id: secerr
  type: string
  description: Returned when AUTH fails or password-protected command issued without AUTH
```

## Variables
```yaml
# Settable parameters covered as parameterized actions above.
# UNRESOLVED: no additional settable variables beyond those expressed as action parameters
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications
```

## Macros
```yaml
# @RUNMACRO executes user-defined macros stored on device.
# @MACRONAMES enumerates them. Macro definitions are configured via LS10 setup menus, not via this API.
description: "@RUNMACRO {macro}\r - executes user-defined macro stored on LS10"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "AUTH command must precede any password-protected command; otherwise command returns SECERR. NetCmd password gates operator commands; Setup password gates VNC GUI (out of scope of this spec)."
```

## Notes
- All commands begin with `@` and end with `<CR>` (0x0D).
- For Read/Write commands, omit final argument to read without changing.
- TCP connection drops/resets during power-on; client must reconnect after `@POWER 1`.
- Power-on requires 15 seconds before unit operational.
- `AUTH` valid only for duration of TCP/IP connection (no per-session caching needed, but re-auth required after reconnect).
- Source text uses `<cr>` lowercase; canonical form is `<CR>` = 0x0D.

## Provenance

```yaml
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/57/ls10/207670/tn-h802-rev-a2-ls10-remote-command-api.pdf
retrieved_at: 2026-06-30T10:14:15.945Z
last_checked_at: 2026-07-07T11:32:13.412Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:32:13.412Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions have literal command matches in source; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated in source"
- "baud rate not stated in source (only \"desired baud rate\" mentioned)"
- "parity not stated in source"
- "stop bits not stated in source"
- "no additional settable variables beyond those expressed as action parameters"
- "source documents no unsolicited notifications"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
