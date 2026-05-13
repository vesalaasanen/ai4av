---
spec_id: admin/datasat_digital_entertainment-rs20i
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
retrieved_at: 2026-05-04T15:21:18.866Z
last_checked_at: 2026-05-01T07:34:53.969Z
generated_at: 2026-05-01T07:34:53.969Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-01T07:34:53.969Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions matched literally; transport (port 14500, data_bits 8) verified; source fully represented by spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Datasat Digital Entertainment RS20i Control Spec

## Summary
The RS20i is a digital audio processor supporting multiple audio decoding formats (Dolby, DTS, Auro-3D). Control via RS-232 serial or TCP/IP Ethernet on port 14500. Command format: `@COMMAND <arg1> <arg2><CR>`. Password authentication supported for network connections; serial commands operate without password.

<!-- UNRESOLVED: GPIO pulse duration (250ms stated but not configurable); audio decoder option availability (Auro-3D, DTS Neo:X, Atmos); firmware compatibility ranges -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 14500
serial:
  baud_rate: null  # UNRESOLVED: configurable in menu, value not stated in source
  data_bits: 8
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: password  # stated: NetCmd/Setup passwords via AUTH command
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: input_selection
  label: Input Selection
  kind: action
  params:
    - name: input
      type: string
      description: Input name (exact match required; spaces allowed)

- id: eq_selection
  label: EQ Selection
  kind: action
  params:
    - name: eq
      type: string
      description: EQ name (exact match required; spaces allowed)

- id: power
  label: Standby Power
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = power off/sleep, 1 = operating (requires 15s)"

- id: screensaver
  label: Screensaver On/Off
  kind: action
  params:
    - name: cmd
      type: string
      description: "ON = deactivate, OFF = activate"

- id: runmacro
  label: Execute RS20i Macro
  kind: action
  params:
    - name: macro
      type: string
      description: Macro name (exact match, spaces allowed)

- id: pulse
  label: Output a Pulse
  kind: action
  params:
    - name: output
      type: integer
      description: GPIO number (1-21), fixed 250ms pulse

- id: volume
  label: Master Volume Level
  kind: action
  params:
    - name: value
      type: integer
      description: "Volume level: 0 (-0dB) to 700 (-70.0 dB) in 0.5dB steps (increment of 5). Prefix +/- to adjust relative to current."

- id: volume_adjust
  label: Master Volume Adjust
  kind: action
  params:
    - name: delta
      type: integer
      description: "Relative volume change: +5 = +0.5dB, -5 = -0.5dB"

- id: mute
  label: Master Volume Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0 = unmute, 1 = mute, + = toggle"

- id: monitor_level
  label: Monitor Level
  kind: action
  params:
    - name: level
      type: integer
      description: "Monitor level: 0 (min) to 100 (max)"

- id: monitor_mute
  label: Monitor Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0 = unmute, 1 = mute"

- id: noise_sequencer
  label: Channel Noise Sequencer
  kind: action
  params:
    - name: value
      type: integer
      description: "0 = off, 1 = auto sequence, 2 = manual stop, 3 = channel step"

- id: decoder_post
  label: Post Processing Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off/None, 3=DTS Neo:X, 4=Dolby PLII/PLIIx, 5=Dolby PLIIz, 6=Auro-3D, 7=Dolby Surround, 8=DTS Neural:X, 9=Stereo Surround"

- id: neox_mode
  label: Neo:X Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Cinema, 1=Music, 2=Game"

- id: neox_lfe
  label: Neo:X Subwoofer Generate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable"

- id: dtsx_dialog
  label: DTS:X Dialog Boost
  kind: action
  params:
    - name: n
      type: integer
      description: "Gain in dB (0 to 6), or +/- to adjust relative"

- id: dpl2_mode
  label: Pro Logic II/IIx Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Pro Logic, 2=Music, 3=Movie, 4=Dolby Digital EX"

- id: dpl2_dim
  label: Pro Logic IIx Dimension
  kind: action
  params:
    - name: dim
      type: integer
      description: "-7 (rear) to +7 (front)"

- id: dpl2_cw
  label: Pro Logic IIx Center Width
  kind: action
  params:
    - name: cw
      type: integer
      description: "0 (off) to 7 (phantom center)"

- id: dpl2_pano
  label: Pro Logic IIx Panorama
  kind: action
  params:
    - name: pano
      type: integer
      description: "0=off, 1=on"

- id: dpl2_hegain
  label: Pro Logic IIz Height Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Low, 1=Mid, 2=High"

- id: auro_strength
  label: Auro-3D Strength
  kind: action
  params:
    - name: value
      type: integer
      description: "1-16 (16 = highest strength)"

- id: auro_preset
  label: Auro-3D Preset
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Small, 1=Medium, 2=Large, 3=Speech"

- id: auro_lm
  label: Auro-3D Listening Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Native, 1=Stereo, 2=Surround, 3=Auro-3D"

- id: dsu_center_spread
  label: Dolby Surround Upmixer Center Spread
  kind: action
  params:
    - name: value
      type: integer
      description: "0=disabled, 1=enabled"

- id: downsample_for_dsu
  label: Downsample for DSU
  kind: action
  params:
    - name: value
      type: integer
      description: "0=disabled, 1=enabled"

- id: truehd_drc
  label: Dolby DRC Setting
  kind: action
  params:
    - name: drc
      type: integer
      description: "0=Off, 1=On/TrueHD-Auto, 2=DRC On"

- id: post_stereo_gain
  label: Post Stereo Gain
  kind: action
  params:
    - name: n
      type: integer
      description: "Gain in dB (-20 to 0)"

- id: decoder_dts_lfe_boost
  label: DTS LFE Boost
  kind: action
  params:
    - name: dtslfe
      type: integer
      description: "0=do not apply 10dB gain for DTS, 1=apply"

- id: decoder_pcm_lfe_boost
  label: PCM LFE Boost
  kind: action
  params:
    - name: pcmlfe
      type: integer
      description: "0=do not apply 10dB gain for PCM, 1=apply"

- id: decoder_dd_lfe_boost
  label: Dolby LFE Boost
  kind: action
  params:
    - name: ddlfe
      type: integer
      description: "0=do not apply 10dB gain for Dolby Digital, 1=apply"

- id: auth
  label: Authorization
  kind: action
  params:
    - name: password
      type: string
      description: "NetCmd or Setup level password"
- id: inputnames
  label: List Input Names
  kind: query

- id: macronames
  label: List Macro Names
  kind: query

- id: eqnames
  label: List EQ Setup Names
  kind: query

- id: decstream
  label: Decoder Stream
  kind: query

- id: decchans
  label: Decoder Channels
  kind: query

- id: system
  label: System Information
  kind: query

- id: identify
  label: Identify
  kind: query

- id: model
  label: Model
  kind: query

- id: serialno
  label: Serial Number
  kind: query

- id: mac
  label: MAC Address
  kind: query

- id: vidres
  label: Video Resolution
  kind: query

- id: vidprot
  label: Video Protection
  kind: query
```

## Feedbacks
```yaml
- id: input_response
  label: Input Selection Response
  type: string
  description: "Echoes current input name"

- id: eqset_response
  label: EQ Selection Response
  type: string
  description: "Echoes current EQ name"

- id: power_response
  label: Power Response
  type: string
  description: "Echoes current power mode"

- id: ok_response
  label: OK
  type: string
  description: "Command acknowledged"

- id: err_no_macro
  label: ERR no macro
  type: string
  description: "Macro does not exist"

- id: volume_response
  label: Volume Level Response
  type: integer
  description: "Volume level 0-700"

- id: muted_response
  label: Mute Response
  type: integer
  description: "0=unmute, 1=mute"

- id: monitorlevel_response
  label: Monitor Level Response
  type: integer
  description: "Level 0-100"

- id: monitormute_response
  label: Monitor Mute Response
  type: integer
  description: "0=unmute, 1=mute"

- id: noiseseq_response
  label: Noise Sequencer Response
  type: integer
  description: "Current noise sequencer mode"

- id: decoderpost_response
  label: Decoder Post Response
  type: integer
  description: "Current post processing mode"

- id: decstream_response
  label: Decoder Stream
  type: string
  description: "Text description of current audio stream type"

- id: decchans_response
  label: Decoder Channels
  type: string
  description: "Channel configuration string (e.g. 7.1)"

- id: inputnames_response
  label: Input Names List
  type: string
  description: "Comma-delimited list of input names"

- id: macronames_response
  label: Macro Names List
  type: string
  description: "Comma-delimited list of macro names"

- id: eqnames_response
  label: EQ Names List
  type: string
  description: "Comma-delimited list of EQ set names"

- id: system_response
  label: System Information
  type: string
  description: "VER, VERDATE, MAC address"

- id: identify_response
  label: Identify
  type: string
  description: "AP20, IP, info2, info1, screen"

- id: model_response
  label: Model
  type: string
  description: "RS20i"

- id: auth_response
  label: Authorization Response
  type: string
  description: "SETUP, OP, or SECERR"

- id: serialno_response
  label: Serial Number
  type: string
  description: "Unit serial number"

- id: mac_response
  label: MAC Address
  type: string
  description: "12-digit MAC address"

- id: vidres_response
  label: Video Resolution
  type: string
  description: "Current video resolution"

- id: vidprot_response
  label: Video Protection
  type: string
  description: "Current video protection status"
```

## Variables
```yaml
# All read/write parameters are captured in Actions.
# UNRESOLVED: no standalone settable parameters not tied to discrete commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# User-defined macros managed via RS20i setup menus; command RUNMACRO invokes them.
# UNRESOLVED: macro content/sequencing not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_timing
    description: "Power on to operating mode requires 15 seconds before unit is operational"
  - id: network_reconnect_after_power_on
    description: "TCP/IP connection is closed/reset during power on; reconnect required after power on"
# UNRESOLVED: no safety warnings or interlock procedures explicitly stated in source beyond power-on timing
```

## Notes
Command format: `@COMMAND <arg1> <arg2><CR>` (carriage return terminator). Read/Write commands: omit final argument to read, include to write. Inquiry commands (SYSTEM, IDENTIFY) operate without password. AUTH command required before password-protected commands; valid for duration of TCP connection only. NetCmd Password does not affect serial access. Setup Password affects setup commands only, not operator-level commands documented here.
<!-- UNRESOLVED: serial baud rate (configurable in menu, specific value not stated); parity/stop bits not stated; firmware version compatibility; GPIO pulse width fixed at 250ms (not configurable); audio decoder option availability (Auro-3D, DTS Neo:X, Atmos) -->

## Provenance

```yaml
source_domains:
  - datasatdigital.com
retrieved_at: 2026-05-04T15:21:18.866Z
last_checked_at: 2026-05-01T07:34:53.969Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-01T07:34:53.969Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions matched literally; transport (port 14500, data_bits 8) verified; source fully represented by spec."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
