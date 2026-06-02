---
spec_id: admin/datasat-digital-entertainment-rs20i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Datasat Digital Entertainment RS20i Control Spec"
manufacturer: "Datasat Digital Entertainment"
model_family: RS20i
aliases: []
compatible_with:
  manufacturers:
    - "Datasat Digital Entertainment"
  models:
    - RS20i
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/53/rs20i/207628/tn-h413-01-rev-b1-rs20i-control.pdf
retrieved_at: 2026-05-04T15:21:18.866Z
last_checked_at: 2026-06-02T17:22:00.537Z
generated_at: 2026-06-02T17:22:00.537Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial default baud rate, parity, stop bits, flow control not stated in source (baud rate is user-selectable)"
  - "source says baud rate is user-selectable, no default stated"
  - "not stated in source"
  - "source does not document any free-form settable parameters"
  - "source does not document unsolicited notifications."
  - "user-defined macros are executed by @RUNMACRO {name};"
  - "source contains no explicit safety warnings, interlocks,"
  - "serial default baud rate, parity, stop bits, flow control not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:00.537Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions matched literally in source; transport values (port 14500, serial 8 data bits) verified; complete source command coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Datasat Digital Entertainment RS20i Control Spec

## Summary
The Datasat RS20i is a high-end audio/video processor supporting two-way control over RS-232 (DB-style "Control" connector) and TCP/IP on port 14500. Commands are ASCII text framed by a leading `@` and terminated with `<CR>` (0x0D). A password-based authentication layer (`AUTH`) gates restricted commands over the network; serial commands are not gated by NetCmd password.

<!-- UNRESOLVED: serial default baud rate, parity, stop bits, flow control not stated in source (baud rate is user-selectable) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 14500
serial:
  baud_rate: null  # UNRESOLVED: source says baud rate is user-selectable, no default stated
  data_bits: 8
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: password
  command: "@AUTH {password}\r"
  notes: "Password is checked against Setup password first, then NetCmd. Returns SETUP, OP, or SECERR."
```

## Traits
```yaml
- powerable       # POWER command present
- routable        # INPUT command present
- queryable       # Many status query commands present
- levelable       # VOLUME, MONITORLEVEL, MUTED, MONITORMUTE present
```

## Actions
```yaml
- id: input_select
  label: Input Selection
  kind: action
  command: "@INPUT {input}\r"
  params:
    - name: input
      type: string
      description: Input name (must match RS20i input name exactly; spaces allowed)
- id: input_query
  label: Input Selection Query
  kind: query
  command: "@INPUT\r"
  params: []
- id: eq_set
  label: EQ Selection
  kind: action
  command: "@EQSET {eq}\r"
  params:
    - name: eq
      type: string
      description: EQ set name (must match RS20i EQ name exactly)
- id: eq_query
  label: EQ Selection Query
  kind: query
  command: "@EQSET\r"
  params: []
- id: power_set
  label: Standby Power
  kind: action
  command: "@POWER {mode}\r"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "0 = power off / sleep; 1 = operating (requires 15s)"
  notes: "On TCP/IP the network connection is reset during power-on; reconnect after."
- id: power_query
  label: Power State Query
  kind: query
  command: "@POWER\r"
  params: []
- id: screensaver_set
  label: Screensaver On/Off
  kind: action
  command: "@SCR {cmd}\r"
  params:
    - name: cmd
      type: enum
      values: [ON, OFF]
      description: "ON = deactivate screensaver; OFF = display screensaver"
- id: run_macro
  label: Execute RS20i Macro
  kind: action
  command: "@RUNMACRO {macro}\r"
  params:
    - name: macro
      type: string
      description: Macro name (must match exactly; spaces allowed)
- id: pulse_output
  label: GPIO Pulse
  kind: action
  command: "@PULSE {output}\r"
  params:
    - name: output
      type: integer
      description: GPIO number 1 to 21 (pulse is fixed 250ms)
- id: volume_set
  label: Master Volume Level
  kind: action
  command: "@VOLUME {value}\r"
  params:
    - name: value
      type: string
      description: "0 (0dB) to 700 (-70.0dB) in 5-unit (0.5dB) steps. Use +N / -N for relative change."
- id: volume_query
  label: Master Volume Query
  kind: query
  command: "@VOLUME\r"
  params: []
- id: muted_set
  label: Master Volume Mute
  kind: action
  command: "@MUTED {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "+"]
      description: "0 = unmute; 1 = mute; + = toggle"
- id: muted_query
  label: Master Mute Query
  kind: query
  command: "@MUTED\r"
  params: []
- id: monitor_level_set
  label: Monitor Level
  kind: action
  command: "@MONITORLEVEL {level}\r"
  params:
    - name: level
      type: integer
      description: 0 (min) to 100 (max)
- id: monitor_level_query
  label: Monitor Level Query
  kind: query
  command: "@MONITORLEVEL\r"
  params: []
- id: monitor_mute_set
  label: Monitor Mute
  kind: action
  command: "@MONITORMUTE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0 = unmute; 1 = mute"
- id: monitor_mute_query
  label: Monitor Mute Query
  kind: query
  command: "@MONITORMUTE\r"
  params: []
- id: noise_seq_set
  label: Channel Noise Sequencer
  kind: action
  command: "@NOISESEQ {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0 = off; 1 = auto sequence; 2 = manual stop; 3 = step to next channel"
- id: noise_seq_query
  label: Channel Noise Sequencer Query
  kind: query
  command: "@NOISESEQ\r"
  params: []
- id: decoder_post
  label: Post Processing Mode
  kind: action
  command: "@DECODERPOST {mode}\r"
  params:
    - name: mode
      type: enum
      values: ["0", "3", "4", "5", "6", "7", "8", "9"]
      description: "0=Off, 3=DTS Neo:X, 4=Dolby PLII/IIx, 5=PLIIz, 6=Auro-3D, 7=Dolby Surround, 8=DTS Neural:X, 9=Stereo Surround"
- id: decoder_post_query
  label: Post Processing Mode Query
  kind: query
  command: "@DECODERPOST\r"
  params: []
- id: neox_mode
  label: Neo:X Mode
  kind: action
  command: "@NEOXMODE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2"]
      description: "0 = Cinema; 1 = Music; 2 = Game"
- id: neox_lfe
  label: Generate Subwoofer with Neo:X
  kind: action
  command: "@NEOXLFE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0 = Disable; 1 = Enable"
- id: dtsx_dialog
  label: DTS:X Dialog Boost
  kind: action
  command: "@DTSXDIALOG {n}\r"
  params:
    - name: n
      type: string
      description: "Gain in dB (0-6) OR + / - for relative step by 1"
- id: dpl2_mode
  label: Pro Logic II/IIx Mode
  kind: action
  command: "@DPL2MODE {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "2", "3", "4"]
      description: "0 = Pro Logic; 2 = Music; 3 = Movie; 4 = Dolby Digital EX"
- id: dpl2_dim
  label: PLIIx Dimension
  kind: action
  command: "@DPL2DIM {dim}\r"
  params:
    - name: dim
      type: integer
      description: "-7 (front) to +7 (rear)"
- id: dpl2_cw
  label: PLIIx Center Width
  kind: action
  command: "@DPL2CW {cw}\r"
  params:
    - name: cw
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7"]
      description: "0=Off; 3=Neutral; 7=Phantom Center"
- id: dpl2_pano
  label: PLIIx Panorama
  kind: action
  command: "@DPL2PANO {pano}\r"
  params:
    - name: pano
      type: enum
      values: ["0", "1"]
      description: "0 = off; 1 = on"
- id: dpl2_he_gain
  label: PLIIz Height Gain
  kind: action
  command: "@DPL2HEGAIN {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2"]
      description: "0 = Low; 1 = Mid; 2 = High"
- id: auro_strength
  label: Auro-3D Upmix Strength
  kind: action
  command: "@AUROSTRENGTH {value}\r"
  params:
    - name: value
      type: integer
      description: "1 to 16; 16 is highest strength"
- id: auro_preset
  label: Auro-3D Preset
  kind: action
  command: "@AUROPRESET {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0=Small; 1=Medium; 2=Large; 3=Speech"
- id: auro_listen_mode
  label: Auro-3D Listening Mode
  kind: action
  command: "@AUROLM {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0=Native; 1=Stereo; 2=Surround; 3=Auro-3D"
- id: dsu_center_spread
  label: Dolby Surround Upmixer Center Spread
  kind: action
  command: "@DSUCENTERSPREAD {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0 = disabled; 1 = enabled"
- id: downsample_for_dsu
  label: Downsample for DSU
  kind: action
  command: "@DOWNSAMPLEFORDSU {value}\r"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0 = disabled; 1 = enabled"
  notes: "Response echo uses 'DOWNSAMPEFORDSU' (typo in source) on the wire."
- id: truehd_drc
  label: Dolby DRC Setting
  kind: action
  command: "@TRUEHDDRC {drc}\r"
  params:
    - name: drc
      type: enum
      values: ["0", "1", "2"]
      description: "0 = DRC Off; 1 = On / TrueHD-Auto; 2 = DRC On"
- id: post_stereo_gain
  label: Post Stereo Gain
  kind: action
  command: "@POSTSTEREOGAIN {n}\r"
  params:
    - name: n
      type: integer
      description: "Gain/attenuation in dB; -20 to 0"
- id: decoder_dts_lfe_boost
  label: DTS LFE Boost
  kind: action
  command: "@DECODERDTSLFEBOOST {dtslfe}\r"
  params:
    - name: dtslfe
      type: enum
      values: ["0", "1"]
      description: "0 = do not apply 10dB gain for DTS; 1 = apply 10dB gain for DTS"
- id: decoder_pcm_lfe_boost
  label: PCM LFE Boost
  kind: action
  command: "@DECODERPCMLFEBOOST {pcmlfe}\r"
  params:
    - name: pcmlfe
      type: enum
      values: ["0", "1"]
      description: "0 = do not apply 10dB gain for PCM; 1 = apply 10dB gain for PCM"
- id: decoder_dd_lfe_boost
  label: Dolby Digital LFE Boost
  kind: action
  command: "@DECODERDDLFEBOOST {ddlfe}\r"
  params:
    - name: ddlfe
      type: enum
      values: ["0", "1"]
      description: "0 = do not apply 10dB gain for Dolby Digital; 1 = apply 10dB gain for Dolby Digital"
- id: dec_stream
  label: Decoder Stream Description
  kind: query
  command: "@DECSTREAM\r"
  params: []
- id: dec_chans
  label: Decoder Channels
  kind: query
  command: "@DECCHANS\r"
  params: []
- id: input_names
  label: List Input Names
  kind: query
  command: "@INPUTNAMES\r"
  params: []
- id: macro_names
  label: List Macro Names
  kind: query
  command: "@MACRONAMES\r"
  params: []
- id: eq_names
  label: List EQ Setup Names
  kind: query
  command: "@EQNAMES\r"
  params: []
- id: system_info
  label: System Information
  kind: query
  command: "@SYSTEM\r"
  params: []
- id: identify
  label: Identify
  kind: query
  command: "@IDENTIFY\r"
  params: []
- id: model_query
  label: Model
  kind: query
  command: "@MODEL\r"
  params: []
- id: auth
  label: Authorization
  kind: action
  command: "@AUTH {password}\r"
  params:
    - name: password
      type: string
      description: "Setup or NetCmd password (Latin alphanumeric only)"
- id: serial_no
  label: Serial Number
  kind: query
  command: "@SERIALNO\r"
  params: []
- id: mac
  label: MAC Address
  kind: query
  command: "@MAC\r"
  params: []
- id: vidres
  label: Video Resolution
  kind: query
  command: "@VIDRES\r"
  params: []
- id: vidprot
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
  source: "@POWER\r"
- id: muted_state
  type: enum
  values: ["0", "1"]
  source: "@MUTED\r"
- id: monitor_mute_state
  type: enum
  values: ["0", "1"]
  source: "@MONITORMUTE\r"
- id: volume_level
  type: integer
  range: [0, 700]
  source: "@VOLUME\r"
- id: monitor_level
  type: integer
  range: [0, 100]
  source: "@MONITORLEVEL\r"
- id: screensaver_ack
  type: string
  value: "OK"
  source: "@SCR {ON|OFF}\r"
- id: macro_ack
  type: string
  values: ["OK", "ERR no macro"]
  source: "@RUNMACRO {macro}\r"
- id: pulse_ack
  type: string
  value: "OK"
  source: "@PULSE {output}\r"
- id: auth_state
  type: enum
  values: ["SETUP", "OP", "SECERR"]
  source: "@AUTH {password}\r"
- id: model
  type: string
  value: "RS20i"
  source: "@MODEL\r"
- id: dec_stream_text
  type: string
  source: "@DECSTREAM\r"
- id: dec_chans_text
  type: string
  source: "@DECCHANS\r"
- id: input_names_list
  type: string
  source: "@INPUTNAMES\r"
- id: macro_names_list
  type: string
  source: "@MACRONAMES\r"
- id: eq_names_list
  type: string
  source: "@EQNAMES\r"
- id: system_multiline
  type: string
  source: "@SYSTEM\r"
  notes: "Multi-field: VER {version} LF, VERDATE {date} LF, MAC {mac} CR"
- id: identify_payload
  type: string
  source: "@IDENTIFY\r"
  notes: "AP20 {ip},{info2},{info1},{screen}"
- id: serial_no
  type: string
  source: "@SERIALNO\r"
- id: mac_address
  type: string
  source: "@MAC\r"
- id: video_resolution
  type: string
  source: "@VIDRES\r"
- id: video_protection
  type: string
  source: "@VIDPROT\r"
```

## Variables
```yaml
# UNRESOLVED: source does not document any free-form settable parameters
# outside the per-command enums/ranges enumerated above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: user-defined macros are executed by @RUNMACRO {name};
# the list is queried via @MACRONAMES. No built-in macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks,
# or power-on sequencing requirements beyond "operating mode requires 15s".
```

## Notes
- All commands are framed `@COMMAND [arg1] [arg2]` terminated by `<CR>` (0x0D). Responses are ASCII terminated by `<CR>`.
- For Read/Write commands, omit the final argument to read without changing.
- TCP port is 14500. Serial: 8 data bits, baud rate user-selectable (System -> Automation -> Serial). **Serial Command Mode must be set to "RS20i"** for commands to be recognized.
- NetCmd password is required over TCP/IP for many commands; the AUTH command must be sent first, and authorization is valid for the duration of the TCP connection. Setup password also exists for setup-level commands (not in scope of this operator document). Serial commands are NOT gated by NetCmd password.
- Sending AUTH with wrong password (or sending a protected command without AUTH first) returns "SECERR" and the command is a no-op.
- Power-on over TCP/IP drops the network connection; client must reconnect.
- @DOWNSAMPLEFORDSU response echoes the misspelled "DOWNSAMPEFORDSU" on the wire; senders must accept this echo.
- @AUTH and passwords accept Latin alphanumeric characters only.
- Setup Password (front-panel or remote setup) does NOT affect operator-level commands documented here.

<!-- UNRESOLVED: serial default baud rate, parity, stop bits, flow control not stated in source. -->

## Provenance

```yaml
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/53/rs20i/207628/tn-h413-01-rev-b1-rs20i-control.pdf
retrieved_at: 2026-05-04T15:21:18.866Z
last_checked_at: 2026-06-02T17:22:00.537Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:00.537Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions matched literally in source; transport values (port 14500, serial 8 data bits) verified; complete source command coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial default baud rate, parity, stop bits, flow control not stated in source (baud rate is user-selectable)"
- "source says baud rate is user-selectable, no default stated"
- "not stated in source"
- "source does not document any free-form settable parameters"
- "source does not document unsolicited notifications."
- "user-defined macros are executed by @RUNMACRO {name};"
- "source contains no explicit safety warnings, interlocks,"
- "serial default baud rate, parity, stop bits, flow control not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
