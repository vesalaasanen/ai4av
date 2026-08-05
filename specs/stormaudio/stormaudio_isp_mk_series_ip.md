---
spec_id: admin/stormaudio-isp-mk-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "StormAudio ISP-MK Series Control Spec"
manufacturer: StormAudio
model_family: "ISP Elite MK1"
aliases: []
compatible_with:
  manufacturers:
    - StormAudio
  models:
    - "ISP Elite MK1"
    - "ISP Elite MK2"
    - "ISP Core 16"
  firmware: "\"4.6r1 and beyond\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - stormaudio.com
source_urls:
  - https://www.stormaudio.com/wp-content/uploads/2024/10/Stormaudio_isp_tcpip_api_protocol_fw4.6r1_v23.pdf
retrieved_at: 2026-07-24T18:50:03.997Z
last_checked_at: 2026-08-05T08:49:35.992Z
generated_at: 2026-08-05T08:49:35.992Z
firmware_coverage: "\"4.6r1 and beyond\""
protocol_coverage: []
known_gaps:
  - "Astral 16 and SP4 listed in ssp.model responses but not in compatible_with models — source lists them as models but spec is for ISP-MK series"
  - "source does not document multi-step command sequences;"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility — source states \"4.6r1 and beyond\" but does not specify upper bound."
  - "message-status IDs 0 and 99 — source table row is empty."
  - "trigger count (max N triggers) — source uses ssp.trig{n} but never states N."
  - "maximum number of inputs and presets — source lists examples but no numeric caps."
  - "discrete value of \"xx\" placeholder in feedback IDs (e.g. exact code mapping for ssp.format, ssp.stream, ssp.fs)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:49:35.992Z
  matched_actions: 171
  action_count: 171
  confidence: medium
  summary: "All 171 spec action ids have literal wire-level matches in source; transport (TCP port 23, no auth) is verbatim; source command catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# StormAudio ISP-MK Series Control Spec

## Summary
TCP/IP control protocol for the StormAudio ISP family of Immersive Sound Processors (ISP Elite MK1, ISP Elite MK2, ISP Core 16, plus rebranded Bryston/Focal variants). ASCII command/response model over Telnet port 23, newline-terminated. Covers power, input select, preset, surround mode, theater audio controls, per-zone audio, front panel, triggers, HDMI info, OSD, and front-panel navigation.

<!-- UNRESOLVED: Astral 16 and SP4 listed in ssp.model responses but not in compatible_with models — source lists them as models but spec is for ISP-MK series -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # source: "The ISP listens to port 23 (Telnet) for incoming connections"
auth:
  type: none  # inferred: no auth procedure in source

# Message framing (from source):
#   - ASCII strings, terminated by <LF> (\x0A / \n)
#   - On connect, ISP broadcasts current values of all parameters
#   - On any parameter change via any interface, new value is broadcast to all connected clients
#   - Unrecognized / out-of-range commands return literal string "error"
```

## Traits
```yaml
- powerable    # inferred from ssp.power.on / ssp.power.off
- routable     # inferred from ssp.input.[xx] + inputZone2
- queryable    # inferred from numerous read commands (ssp.power, ssp.vol, ssp.mute, etc.)
- levelable    # inferred from volume/bass/treble/brightness/c_en/s_en/lfe_en/lipsync/loudness controls
```

## Actions
```yaml
# Section 3.1 - Control Group
- id: keepalive
  label: Keepalive / Ping
  kind: query
  command: "ssp.keepalive"
  params: []

- id: procstate_read
  label: Read Processor State
  kind: query
  command: "ssp.procstate"
  response: "ssp.procstate.[xx] where 0=off (sleep), 1=init/shutdown, 2=on"

- id: power_read
  label: Read Power Status
  kind: query
  command: "ssp.power"
  response: "ssp.power.on or ssp.power.off"

- id: power_on
  label: Power On (take out of sleep)
  kind: action
  command: "ssp.power.on"
  notes: "Processor is fully operational only after ssp.procstate.[2] is received"

- id: power_off
  label: Power Off (sleep mode)
  kind: action
  command: "ssp.power.off"

- id: power_toggle
  label: Toggle Power
  kind: action
  command: "ssp.power.toggle"
  response: "ssp.power.on or ssp.power.off"

- id: reset
  label: Processor Reset
  kind: action
  command: "ssp.reset"
  notes: "Processor will reboot; TCP connection will be lost"

- id: close_connection
  label: Close TCP Connection
  kind: action
  command: "ssp.close"
  notes: "Does not shut down the API application"

- id: version_read
  label: Read Firmware Version
  kind: query
  command: "ssp.version"
  response: "ssp.version.[xx]"

- id: brand_read
  label: Read Brand
  kind: query
  command: "ssp.brand"
  response: "ssp.brand.['BRAND']; BRAND in StormAudio, Bryston, FOCAL"

- id: model_read
  label: Read Model
  kind: query
  command: "ssp.model"
  response: "ssp.model.['MODEL']; MODEL in IISP, Astral 16, ISP Elite MK1, SP4, ISP Elite MK2, ISP Core 16"

# Section 3.2 - Message Status
- id: msgstatus_read
  label: Read Message Status ID
  kind: query
  command: "ssp.msgstatus"
  response: "ssp.msgstatus.[xx] (see msg-id table)"

- id: msgstatusTxt_read
  label: Read Message Status Text
  kind: query
  command: "ssp.msgstatusTxt"
  response: "ssp.msgstatusTxt.[xx, 'msg']"

# Section 3.3.1 - Inputs
- id: input_read
  label: Read Active Input
  kind: query
  command: "ssp.input"
  response: "ssp.input.[xx]"

- id: input_select
  label: Select Input
  kind: action
  command: "ssp.input.{id}"
  params:
    - name: id
      type: integer
      description: Input ID (returns error if input is disabled)

- id: inputZone2_select
  label: Select Zone2 Audio Input
  kind: action
  command: "ssp.inputZone2.{id}"
  params:
    - name: id
      type: integer
      description: Zone2 input ID (returns 0 if input has no Zone2 Audio IN)

- id: input_next
  label: Select Next Valid Input
  kind: action
  command: "ssp.input.next"

- id: input_prev
  label: Select Previous Valid Input
  kind: action
  command: "ssp.input.prev"

- id: input_list
  label: List All Configured Inputs
  kind: query
  command: "ssp.input.list"
  response: "Bracketed by ssp.input.start / ssp.input.end; per-input: ssp.input.list.['NAME', ID, VIDEO IN ID, AUDIO IN ID, AUDIO ZONE2 IN ID, RESERVED, DELAY, RESERVED]"

- id: inputHdmiMatrixMode_read
  label: Read HDMI Matrix Mode
  kind: query
  command: "ssp.inputHdmiMatrixMode"
  response: "ssp.inputHdmiMatrixMode.[xx]; 0=Mirror, 1=Zone2 A/V, 2=Pass Through; 'error' if HdmiMatrix license not activated"
  notes: "Requires 7+2 eARC board"

- id: inputHdmiPassThru_select
  label: Select HDMI Pass Through Input
  kind: action
  command: "ssp.inputHdmiPassThru.{id}"
  params:
    - name: id
      type: integer
      description: Input ID (0 or one from ssp.input.list)
  notes: "Requires 7+2 eARC board, HdmiMatrix license, and Matrix mode == Pass Through"

# Section 3.3.2 - Preset
- id: preset_read
  label: Read Active Preset
  kind: query
  command: "ssp.preset"
  response: "ssp.preset.[xx]"

- id: preset_select
  label: Select Preset
  kind: action
  command: "ssp.preset.{id}"
  params:
    - name: id
      type: integer

- id: preset_next
  label: Select Next Preset
  kind: action
  command: "ssp.preset.next"

- id: preset_prev
  label: Select Previous Preset
  kind: action
  command: "ssp.preset.prev"

- id: preset_list
  label: List All Configured Presets
  kind: query
  command: "ssp.preset.list"
  response: "Bracketed by ssp.preset.start / ssp.preset.end; per-preset: ssp.preset.list.['NAME', ID, ['zone IDs...'], SPHEREAUDIO, RESERVED×4]"

- id: preset_custom_read
  label: Read Preset Custom Status
  kind: query
  command: "ssp.preset.custom"
  response: "ssp.preset.custom.on (mismatch / edit mode) or ssp.preset.custom.off"

# Section 3.3.3 - Surround Mode
- id: surroundmode_read
  label: Read Preferred Upmix/Surround Mode
  kind: query
  command: "ssp.surroundmode"
  response: "ssp.surroundmode.[xx]; 0=Native, 1=Stereo Downmix, 2=Dolby Surround, 3=DTS Neural:X, 4=Auro-Matic"

- id: surroundmode_set
  label: Set Surround Mode
  kind: action
  command: "ssp.surroundmode.{id}"
  params:
    - name: id
      type: integer
      description: "0=Native, 1=Stereo Downmix, 2=Dolby Surround, 3=DTS Neural:X, 4=Auro-Matic"

- id: surroundmode_list
  label: List Available Surround Modes
  kind: query
  command: "ssp.surroundmode.list"
  response: "Bracketed by ssp.surroundmode.start / ssp.surroundmode.end; per-mode: ssp.surroundmode.list.['NAME', ID]"

- id: allowedmode_read
  label: Read Active Surround Mode (Real)
  kind: query
  command: "ssp.allowedmode"
  response: "ssp.allowedmode.[xx] (0..4, same encoding as surroundmode)"
  notes: "Real active mode; may differ from preferred when content prevents upmixing"

# Section 3.3.4 - Active Speaker
- id: speaker_read
  label: Read Active Speaker Config
  kind: query
  command: "ssp.speaker"
  response: "ssp.speaker.[xx]; 0 = preset without Theater"

# Section 3.4.1 - Mute
- id: mute_read
  label: Read Mute Status
  kind: query
  command: "ssp.mute"
  response: "ssp.mute.on or ssp.mute.off"

- id: mute_on
  label: Mute On
  kind: action
  command: "ssp.mute.on"

- id: mute_off
  label: Mute Off
  kind: action
  command: "ssp.mute.off"

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "ssp.mute.toggle"

# Section 3.4.2 - Dim
- id: dim_read
  label: Read Dim Status
  kind: query
  command: "ssp.dim"
  response: "ssp.dim.on or ssp.dim.off"

- id: dim_on
  label: Dim On
  kind: action
  command: "ssp.dim.on"

- id: dim_off
  label: Dim Off
  kind: action
  command: "ssp.dim.off"

- id: dim_toggle
  label: Dim Toggle
  kind: action
  command: "ssp.dim.toggle"

# Section 3.4.3 - Volume
- id: vol_read
  label: Read Volume
  kind: query
  command: "ssp.vol"
  response: "ssp.vol.[-xx]; range -0 to -100"

- id: vol_up
  label: Volume Up (+1.0 dB)
  kind: action
  command: "ssp.vol.up"

- id: vol_down
  label: Volume Down (-1.0 dB)
  kind: action
  command: "ssp.vol.down"

- id: vol_set
  label: Set Volume
  kind: action
  command: "ssp.vol.{-xx}"
  params:
    - name: level
      type: integer
      description: "Volume in dB, 0..-100"

# Section 3.4.4 - Loudness
- id: loudness_read
  label: Read Loudness Level
  kind: query
  command: "ssp.loudness"
  response: "ssp.loudness.[xx]; 0=Off, 1=Low, 2=Medium, 3=Full"

- id: loudness_set
  label: Set Loudness Level
  kind: action
  command: "ssp.loudness.{xx}"
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=Full"

# Section 3.4.5 - Bass
- id: bass_read
  label: Read Bass Level
  kind: query
  command: "ssp.bass"
  response: "ssp.bass.[xx]; range -6..+6, step 1 dB; max range depends on WebUI Audio Control Range MAX"

- id: bass_up
  label: Bass Up (+1.0 dB)
  kind: action
  command: "ssp.bass.up"

- id: bass_down
  label: Bass Down (-1.0 dB)
  kind: action
  command: "ssp.bass.down"

- id: bass_set
  label: Set Bass Level
  kind: action
  command: "ssp.bass.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"

# Section 3.4.6 - Treble
- id: treble_read
  label: Read Treble Level
  kind: query
  command: "ssp.treble"
  response: "ssp.treble.[xx]; range -6..+6, step 1 dB"

- id: treble_up
  label: Treble Up (+1.0 dB)
  kind: action
  command: "ssp.treble.up"

- id: treble_down
  label: Treble Down (-1.0 dB)
  kind: action
  command: "ssp.treble.down"

- id: treble_set
  label: Set Treble Level
  kind: action
  command: "ssp.treble.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"

# Section 3.4.7 - Brightness
- id: brightness_read
  label: Read Center Brightness
  kind: query
  command: "ssp.brightness"
  response: "ssp.brightness.[xx]; range -6..+6, step 1 dB"

- id: brightness_up
  label: Brightness Up (+1.0 dB)
  kind: action
  command: "ssp.brightness.up"

- id: brightness_down
  label: Brightness Down (-1.0 dB)
  kind: action
  command: "ssp.brightness.down"

- id: brightness_set
  label: Set Brightness Level
  kind: action
  command: "ssp.brightness.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"

# Section 3.4.8 - Center Enhance
- id: c_en_read
  label: Read Center Enhance
  kind: query
  command: "ssp.c_en"
  response: "ssp.c_en.[xx]; range -6..+6, step 1 dB"

- id: c_en_up
  label: Center Enhance Up (+1.0 dB)
  kind: action
  command: "ssp.c_en.up"

- id: c_en_down
  label: Center Enhance Down (-1.0 dB)
  kind: action
  command: "ssp.c_en.down"

- id: c_en_set
  label: Set Center Enhance
  kind: action
  command: "ssp.c_en.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"

# Section 3.4.9 - Surround Enhance
- id: s_en_read
  label: Read Surround Enhance
  kind: query
  command: "ssp.s_en"
  response: "ssp.s_en.[xx]; range -6..+6, step 1 dB"

- id: s_en_up
  label: Surround Enhance Up (+1.0 dB)
  kind: action
  command: "ssp.s_en.up"

- id: s_en_down
  label: Surround Enhance Down (-1.0 dB)
  kind: action
  command: "ssp.s_en.down"

- id: s_en_set
  label: Set Surround Enhance
  kind: action
  command: "ssp.s_en.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"

# Section 3.4.10 - Sub Enhance (DEPRECATED)
- id: sub_en_read
  label: Read Sub Enhance (deprecated)
  kind: query
  command: "ssp.sub_en"
  response: "ssp.sub_en.[xx]; range -6..+6"
  notes: "DEPRECATED since v22-1 - use ssp.lfe_en"

- id: sub_en_up
  label: Sub Enhance Up (deprecated)
  kind: action
  command: "ssp.sub_en.up"
  notes: "DEPRECATED"

- id: sub_en_down
  label: Sub Enhance Down (deprecated)
  kind: action
  command: "ssp.sub_en.down"
  notes: "DEPRECATED"

- id: sub_en_set
  label: Set Sub Enhance (deprecated)
  kind: action
  command: "ssp.sub_en.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"
  notes: "DEPRECATED"

# Section 3.4.11 - LFE Enhance
- id: lfe_en_read
  label: Read LFE Enhance
  kind: query
  command: "ssp.lfe_en"
  response: "ssp.lfe_en.[xx]; range -6..+6, step 1 dB"

- id: lfe_en_up
  label: LFE Enhance Up (+1.0 dB)
  kind: action
  command: "ssp.lfe_en.up"

- id: lfe_en_down
  label: LFE Enhance Down (-1.0 dB)
  kind: action
  command: "ssp.lfe_en.down"

- id: lfe_en_set
  label: Set LFE Enhance
  kind: action
  command: "ssp.lfe_en.{xx}"
  params:
    - name: level
      type: integer
      description: "-6..+6 dB"

# Section 3.4.12 - Lip Sync
- id: lipsync_read
  label: Read Lip Sync
  kind: query
  command: "ssp.lipsync"
  response: "ssp.lipsync.[xx]; range -(Inputs AV Delay + Settings AV Zone Delay) to 100 ms, step 1 ms"

- id: lipsync_up
  label: Lip Sync Up (+5 ms)
  kind: action
  command: "ssp.lipsync.up"

- id: lipsync_down
  label: Lip Sync Down (-5 ms)
  kind: action
  command: "ssp.lipsync.down"

- id: lipsync_set
  label: Set Lip Sync
  kind: action
  command: "ssp.lipsync.{xx}"
  params:
    - name: ms
      type: integer
      description: "Delay in ms"

# Section 3.4.13.1 - Auro Strength
- id: aurostrength_read
  label: Read Auro Strength
  kind: query
  command: "ssp.aurostrength"
  response: "ssp.aurostrength.[xx]; 0..15"
  notes: "Visible only when active surround == Auro-Matic"

- id: aurostrength_set
  label: Set Auro Strength
  kind: action
  command: "ssp.aurostrength.{xx}"
  params:
    - name: level
      type: integer
      description: "0..15"
  notes: "Visible only when active surround == Auro-Matic"

# Section 3.4.13.2 - Auro Preset
- id: auropreset_read
  label: Read Auro Preset
  kind: query
  command: "ssp.auropreset"
  response: "ssp.auropreset.[xx]; 0=Small, 1=Medium, 2=Large, 3=Speech"
  notes: "Visible only when active surround == Auro-Matic"

- id: auropreset_set
  label: Set Auro Preset
  kind: action
  command: "ssp.auropreset.{xx}"
  params:
    - name: id
      type: integer
      description: "0=Small, 1=Medium, 2=Large, 3=Speech"
  notes: "Visible only when active surround == Auro-Matic"

- id: auropreset_list
  label: List Auro Presets
  kind: query
  command: "ssp.auropreset.list"
  response: "Bracketed by ssp.auropreset.start / ssp.auropreset.end; per-preset: ssp.auropreset.list.['NAME', ID]"

# Section 3.4.13.3 - DRC
- id: drc_read
  label: Read DRC Status
  kind: query
  command: "ssp.drc"
  response: "ssp.drc.on / ssp.drc.off / ssp.drc.auto"

- id: drc_on
  label: DRC On
  kind: action
  command: "ssp.drc.on"

- id: drc_off
  label: DRC Off
  kind: action
  command: "ssp.drc.off"

- id: drc_auto
  label: DRC Auto
  kind: action
  command: "ssp.drc.auto"

# Section 3.4.13.4 - Center Spread
- id: cspread_read
  label: Read Center Spread
  kind: query
  command: "ssp.cspread"
  response: "ssp.cspread.on / ssp.cspread.off"

- id: cspread_on
  label: Center Spread On
  kind: action
  command: "ssp.cspread.on"

- id: cspread_off
  label: Center Spread Off
  kind: action
  command: "ssp.cspread.off"

- id: cspread_toggle
  label: Center Spread Toggle
  kind: action
  command: "ssp.cspread.toggle"

# Section 3.4.13.5 - Dialog Control
- id: dialogcontrol_read
  label: Read Dialog Control
  kind: query
  command: "ssp.dialogcontrol"
  response: "ssp.dialogcontrol.[avail, X]; avail=0/1, X=0..6 dB in 1 dB steps"
  notes: "Works only when DTS:X stream indicates dialog control available"

- id: dialogcontrol_set
  label: Set Dialog Control Level
  kind: action
  command: "ssp.dialogcontrol.{x}"
  params:
    - name: x
      type: integer
      description: "0..6 dB"

# Section 3.4.13.6 - Dialog Norm
- id: dialognorm_read
  label: Read Dialog Norm
  kind: query
  command: "ssp.dialognorm"
  response: "ssp.dialgnorm.on / ssp.dialognorm.off"
  notes: "Visible when ssp.stream.[x] contains 'DTS' or 'IMAX'"

- id: dialognorm_on
  label: Dialog Norm On
  kind: action
  command: "ssp.dialognorm.on"

- id: dialognorm_off
  label: Dialog Norm Off
  kind: action
  command: "ssp.dialognorm.off"

- id: dialognorm_toggle
  label: Dialog Norm Toggle
  kind: action
  command: "ssp.dialognorm.toggle"

# Section 3.4.13.7 - IMAX Mode
- id: IMAXMode_read
  label: Read IMAX Mode
  kind: query
  command: "ssp.IMAXMode"
  response: "ssp.IMAXMode.on / ssp.IMAXMode.off / ssp.IMAXMode.auto"
  notes: "Visible when ssp.stream.[x] contains 'IMAX'"

- id: IMAXMode_on
  label: IMAX Mode On
  kind: action
  command: "ssp.IMAXMode.on"
  notes: "Source notes response is ssp.IMAXMode.auto (not .on)"

- id: IMAXMode_off
  label: IMAX Mode Off
  kind: action
  command: "ssp.IMAXMode.off"

- id: IMAXMode_auto
  label: IMAX Mode Auto
  kind: action
  command: "ssp.IMAXMode.auto"

# Section 3.4.13.8 - StormXT
- id: stormxt_read
  label: Read StormXT Status
  kind: query
  command: "ssp.stormxt"
  response: "ssp.stormxt.on or ssp.stormxt.off; 'error' if StormXT license not activated"

- id: stormxt_on
  label: StormXT On
  kind: action
  command: "ssp.stormxt.on"

- id: stormxt_off
  label: StormXT Off
  kind: action
  command: "ssp.stormxt.off"

- id: stormxt_toggle
  label: StormXT Toggle
  kind: action
  command: "ssp.stormxt.toggle"

# Section 3.4.13.9 - Dolby Mode
- id: dolbymode_read
  label: Read Dolby Mode
  kind: query
  command: "ssp.dolbymode"
  response: "ssp.dolbymode.[X]; 0=Off, 1=Movie, 2=Music, 3=Night"

- id: dolbymode_set
  label: Set Dolby Mode
  kind: action
  command: "ssp.dolbymode.{x}"
  params:
    - name: x
      type: integer
      description: "0=Off, 1=Movie, 2=Music, 3=Night"

# Section 3.4.13.9 (2nd) - Dolby Virtualizer
- id: dolbyvirtualizer_read
  label: Read Dolby Virtualizer
  kind: query
  command: "ssp.dolbyvirtualizer"
  response: "ssp.dolbyvirtualizer.on / ssp.dolbyvirtualizer.off"

- id: dolbyvirtualizer_on
  label: Dolby Virtualizer On
  kind: action
  command: "ssp.dolbyvirtualizer.on"

- id: dolbyvirtualizer_off
  label: Dolby Virtualizer Off
  kind: action
  command: "ssp.dolbyvirtualizer.off"

- id: dolbyvirtualizer_toggle
  label: Dolby Virtualizer Toggle
  kind: action
  command: "ssp.dolbyvirtualizer.toggle"

# Section 3.4.14 - SphereAudio Effect
- id: spheraudioeffect_read
  label: Read SphereAudio Effect
  kind: query
  command: "ssp.spheraudioeffect"
  response: "ssp.spheraudioeffect.[X]; 0=ByPass, 1=Lounge, 2=Home Cinema, 3=Concert, 4=Cinema; 'error' if SphereAudio license not activated"

- id: spheraudioeffect_set
  label: Set SphereAudio Effect
  kind: action
  command: "ssp.spheraudioeffect.{x}"
  params:
    - name: x
      type: integer
      description: "0=ByPass, 1=Lounge, 2=Home Cinema, 3=Concert, 4=Cinema"

# Section 3.4.15 - LFE Dim
- id: lfedim_read
  label: Read LFE Dim
  kind: query
  command: "ssp.lfedim"
  response: "ssp.lfedim.on / ssp.lfedim.off"

- id: lfedim_on
  label: LFE Dim On
  kind: action
  command: "ssp.lfedim.on"

- id: lfedim_off
  label: LFE Dim Off
  kind: action
  command: "ssp.lfedim.off"

- id: lfedim_toggle
  label: LFE Dim Toggle
  kind: action
  command: "ssp.lfedim.toggle"

# Section 3.5 - Zones
- id: zones_list
  label: List Configured Zones
  kind: query
  command: "ssp.zones.list"
  response: "Bracketed by ssp.zones.start / ssp.zones.end; per-zone: ssp.zones.list.[ID, 'NAME', LAYOUT, TYPE, USE ZONE2 SOURCE, VOLUME, DELAY, EQ, LIPSYNC, MODE, MUTE, LOUDNESS, AVZONES, BASS, TREBLE, RESERVED×3]"

- id: zones_lipsync_set
  label: Set Zone Lip Sync
  kind: action
  command: "ssp.zones.lipsync.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "ms, range -(Inputs AV Delay + Settings AV Zone Delay) to 100"

- id: zones_volume_set
  label: Set Zone Volume
  kind: action
  command: "ssp.zones.volume.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "0..-100 dB"

- id: zones_volume_up
  label: Zone Volume Up (+1.0 dB)
  kind: action
  command: "ssp.zones.volume.up.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_volume_down
  label: Zone Volume Down (-1.0 dB)
  kind: action
  command: "ssp.zones.volume.down.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_eq_set
  label: Set Zone EQ
  kind: action
  command: "ssp.zones.eq.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "0=Off, 1=On"

- id: zones_eq_toggle
  label: Toggle Zone EQ
  kind: action
  command: "ssp.zones.eq.toggle.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_mute_set
  label: Set Zone Mute
  kind: action
  command: "ssp.zones.mute.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "0=Not muted, 1=Muted"

- id: zones_mute_toggle
  label: Toggle Zone Mute
  kind: action
  command: "ssp.zones.mute.toggle.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_bass_set
  label: Set Zone Bass
  kind: action
  command: "ssp.zones.bass.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "Bass level, step 1 dB"

- id: zones_treble_set
  label: Set Zone Treble
  kind: action
  command: "ssp.zones.treble.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "Treble level, step 1 dB"

- id: zones_mode_set
  label: Set Zone Binaural Mode
  kind: action
  command: "ssp.zones.mode.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "0=Stereo, 1=Binaural"
  notes: "Returns 'error' if SphereAudio license not activated"

- id: zones_mode_toggle
  label: Toggle Zone Binaural Mode
  kind: action
  command: "ssp.zones.mode.toggle.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_useZone2_set
  label: Set Zone Use Zone2
  kind: action
  command: "ssp.zones.useZone2.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "0=No, 1=Yes"

- id: zones_useZone2_toggle
  label: Toggle Zone Use Zone2
  kind: action
  command: "ssp.zones.useZone2.toggle.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_loudness_set
  label: Set Zone Loudness
  kind: action
  command: "ssp.zones.loudness.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: "0..3"

- id: zones_loudness_read
  label: Read Zone Loudness
  kind: query
  command: "ssp.zones.loudness.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_profiles_list
  label: List All Zone Profiles
  kind: query
  command: "ssp.zones.profiles.list"
  response: "Bracketed by ssp.zones.profiles.start / ssp.zones.profiles.end; per-profile: ssp.zones.profiles.list.[zone_id, profile_id, 'NAME', ACTIVE, RESERVED×4]"

- id: zones_profiles_list_by_zone
  label: List Profiles Within Zone
  kind: query
  command: "ssp.zones.profiles.list.{zone_id}"
  params:
    - name: zone_id
      type: integer

- id: zones_profiles_read
  label: Read Active Profile for Zone
  kind: query
  command: "ssp.zones.profiles.{zone_id}"
  params:
    - name: zone_id
      type: integer
  response: "ssp.zones.profiles.[zone_id, profile_id]"

- id: zones_profiles_set
  label: Assign Active Profile for Zone
  kind: action
  command: "ssp.zones.profiles.{zone_id,yy}"
  params:
    - name: zone_id
      type: integer
    - name: yy
      type: integer
      description: Profile ID

# Section 3.6.1 - Front Panel
- id: frontpanel_color_read
  label: Read Front Panel Color
  kind: query
  command: "ssp.frontpanel.color"
  response: "ssp.frontpanel.color.[blue|red|green|white|magenta|orange]"
  notes: "Not available for Bryston/Focal brands"

- id: frontpanel_color_set
  label: Set Front Panel Color
  kind: action
  command: "ssp.frontpanel.color.{color}"
  params:
    - name: color
      type: string
      enum: [blue, red, green, white, magenta, orange]
  notes: "Not available for Bryston/Focal brands"

- id: frontpanel_stbybright_read
  label: Read Front Panel Standby Brightness
  kind: query
  command: "ssp.frontpanel.stbybright"
  response: "ssp.frontpanel.stbybright.[xx]; 0..100, step 10"

- id: frontpanel_stbybright_set
  label: Set Front Panel Standby Brightness
  kind: action
  command: "ssp.frontpanel.stbybright.{xx}"
  params:
    - name: level
      type: integer
      description: "0..100, step 10"

- id: frontpanel_actbright_read
  label: Read Front Panel Active Brightness
  kind: query
  command: "ssp.frontpanel.actbright"
  response: "ssp.frontpanel.actbright.[xx]; 0..100, step 10"

- id: frontpanel_actbright_set
  label: Set Front Panel Active Brightness
  kind: action
  command: "ssp.frontpanel.actbright.{xx}"
  params:
    - name: level
      type: integer
      description: "0..100, step 10"

- id: frontpanel_stbytime_read
  label: Read Front Panel Standby Delay
  kind: query
  command: "ssp.frontpanel.stbytime"
  response: "ssp.frontpanel.stbytime.[xx]; allowed 2, 5, 10, 20, 30, 60 sec"

- id: frontpanel_stbytime_set
  label: Set Front Panel Standby Delay
  kind: action
  command: "ssp.frontpanel.stbytime.{xx}"
  params:
    - name: seconds
      type: integer
      enum: [2, 5, 10, 20, 30, 60]

# Section 3.7.1 - Trigger
- id: trig_read
  label: Read Trigger Status
  kind: query
  command: "ssp.trig{n}"
  params:
    - name: n
      type: integer
  response: "ssp.trig{n}.on or ssp.trig{n}.off"

- id: trig_on
  label: Turn Trigger On
  kind: action
  command: "ssp.trig{n}.on"
  params:
    - name: n
      type: integer

- id: trig_off
  label: Turn Trigger Off
  kind: action
  command: "ssp.trig{n}.off"
  params:
    - name: n
      type: integer

- id: trig_manual_read
  label: Read Trigger Manual/Automatic Mode
  kind: query
  command: "ssp.trig{n}.manual"
  params:
    - name: n
      type: integer
  response: "ssp.trig{n}.manual.on / ssp.trig{n}.manual.off"

- id: trig_toggle
  label: Toggle Trigger
  kind: action
  command: "ssp.trig{n}.toggle"
  params:
    - name: n
      type: integer

- id: trigger_list
  label: List Trigger Names
  kind: query
  command: "ssp.trigger.list"
  response: "Bracketed by ssp.trigger.start / ssp.trigger.end; per-trigger: ssp.trigger.list.['NAME']"

# Section 3.8 - Stream Info
- id: fs_read
  label: Read Input Sample Rate
  kind: query
  command: "ssp.fs"
  response: "ssp.fs.[xx]"

- id: stream_read
  label: Read Input Stream Type
  kind: query
  command: "ssp.stream"
  response: "ssp.stream.[xx]"

- id: format_read
  label: Read Input Channel Configuration
  kind: query
  command: "ssp.format"
  response: "ssp.format.[xx]"

# Section 3.9 - HDMI Info
- id: hdmi_input_read
  label: Read HDMI Output Video-In Info
  kind: query
  command: "ssp.hdmi{x}.input"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"
  response: "ssp.hdmi{x}.input.['yy']"

- id: hdmi_sync_read
  label: Read HDMI Output Sync Info
  kind: query
  command: "ssp.hdmi{x}.sync"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

- id: hdmi_timing_read
  label: Read HDMI Output Timing
  kind: query
  command: "ssp.hdmi{x}.timing"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

- id: hdmi_hdr_read
  label: Read HDMI Output HDR
  kind: query
  command: "ssp.hdmi{x}.hdr"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

- id: hdmi_cp_read
  label: Read HDMI Output Copy Protection
  kind: query
  command: "ssp.hdmi{x}.cp"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

- id: hdmi_colorspace_read
  label: Read HDMI Output Color Space
  kind: query
  command: "ssp.hdmi{x}.colorspace"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

- id: hdmi_colordepth_read
  label: Read HDMI Output Color Depth
  kind: query
  command: "ssp.hdmi{x}.colordepth"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

- id: hdmi_mode_read
  label: Read HDMI Output Mode
  kind: query
  command: "ssp.hdmi{x}.mode"
  params:
    - name: x
      type: integer
      description: "Output 1 or 2"

# Section 3.10 - OSD
- id: osd_info
  label: Toggle Extended OSD Info Panel
  kind: action
  command: "ssp.osd.info"
  notes: "HMC HDMI boards only"

# Section 3.11 - Front Panel Display
- id: display_toggle
  label: Toggle Front Panel Display
  kind: action
  command: "ssp.display.toggle"
  notes: "ISP Core and ISP mk3 (or superior) only"

# Section 3.11.2 - Front Panel Navigation
- id: nav_up
  label: Front Panel Nav Up
  kind: action
  command: "ssp.nav.up"
  notes: "ISP Core and ISP mk3 (or superior) only"

- id: nav_down
  label: Front Panel Nav Down
  kind: action
  command: "ssp.nav.down"
  notes: "ISP Core and ISP mk3 (or superior) only"

- id: nav_left
  label: Front Panel Nav Left
  kind: action
  command: "ssp.nav.left"
  notes: "ISP Core and ISP mk3 (or superior) only"

- id: nav_right
  label: Front Panel Nav Right
  kind: action
  command: "ssp.nav.right"
  notes: "ISP Core and ISP mk3 (or superior) only"

- id: nav_ok
  label: Front Panel Nav OK
  kind: action
  command: "ssp.nav.ok"
  notes: "ISP Core and ISP mk3 (or superior) only"

- id: nav_back
  label: Front Panel Nav Back
  kind: action
  command: "ssp.nav.back"
  notes: "ISP Core and ISP mk3 (or superior) only"
```

## Feedbacks
```yaml
# All feedback is broadcast-style: every connected client receives the new value
# any time a parameter changes via any interface (front panel, WebUI, TCP, etc.).
# Names listed below mirror the response formats documented in the source.

- id: power_state
  type: enum
  values: [on, off]
  examples: ["ssp.power.on", "ssp.power.off"]

- id: procstate
  type: enum
  values: ["0 (off / sleep)", "1 (init or shutdown)", "2 (on)"]
  examples: ["ssp.procstate.0", "ssp.procstate.1", "ssp.procstate.2"]

- id: mute_state
  type: enum
  values: [on, off]

- id: dim_state
  type: enum
  values: [on, off]

- id: vol_level
  type: integer
  description: "0..-100 (dB). Sent as ssp.vol.[-xx]"

- id: loudness_level
  type: enum
  values: ["0 (Off)", "1 (Low)", "2 (Medium)", "3 (Full)"]

- id: bass_level
  type: integer
  description: "-6..+6 dB"

- id: treble_level
  type: integer
  description: "-6..+6 dB"

- id: brightness_level
  type: integer
  description: "-6..+6 dB"

- id: c_en_level
  type: integer
  description: "Center Enhance, -6..+6 dB"

- id: s_en_level
  type: integer
  description: "Surround Enhance, -6..+6 dB"

- id: lfe_en_level
  type: integer
  description: "LFE Enhance, -6..+6 dB"

- id: lipsync_level
  type: integer
  description: "ms; range -(Inputs AV Delay + Settings AV Zone Delay) to 100"

- id: input_id
  type: integer
  description: "Active input ID"

- id: preset_id
  type: integer
  description: "Active preset ID"

- id: presenter_custom
  type: enum
  values: [on, off]
  examples: ["ssp.preset.custom.on", "ssp.preset.custom.off"]

- id: surroundmode_id
  type: integer
  description: "0=Native, 1=Stereo Downmix, 2=Dolby Surround, 3=DTS Neural:X, 4=Auro-Matic"

- id: allowedmode_id
  type: integer
  description: "Real active surround mode (may differ from preferred for non-upmixable content)"

- id: speaker_id
  type: integer
  description: "0 if preset has no Theater"

- id: aurostrength
  type: integer
  description: "0..15"

- id: auropreset_id
  type: integer
  description: "0=Small, 1=Medium, 2=Large, 3=Speech"

- id: drc_state
  type: enum
  values: [on, off, auto]

- id: cspread_state
  type: enum
  values: [on, off]

- id: dialogcontrol
  type: string
  description: "Tuple [available, level dB]; e.g. ssp.dialogcontrol.[1, 3]"

- id: dialognorm_state
  type: enum
  values: [on, off]

- id: imax_mode
  type: enum
  values: [on, off, auto]

- id: stormxt_state
  type: enum
  values: [on, off]
  notes: "Returns 'error' without StormXT license"

- id: dolbymode
  type: enum
  values: ["0 (Off)", "1 (Movie)", "2 (Music)", "3 (Night)"]

- id: dolbyvirtualizer_state
  type: enum
  values: [on, off]

- id: spheraudioeffect
  type: enum
  values: ["0 (ByPass)", "1 (Lounge)", "2 (Home Cinema)", "3 (Concert)", "4 (Cinema)"]
  notes: "Returns 'error' without SphereAudio license"

- id: lfedim_state
  type: enum
  values: [on, off]

- id: zone_volume
  type: integer
  description: "Zone volume 0..-100 dB"
  examples: ["ssp.zones.volume.[zone_id, yy]"]

- id: zone_mute
  type: integer
  description: "0=Not muted, 1=Muted"

- id: zone_eq
  type: integer
  description: "0=Off, 1=On"

- id: zone_loudness
  type: integer
  description: "0..3"

- id: zone_mode
  type: integer
  description: "0=Stereo, 1=Binaural"

- id: zone_bass
  type: integer
  description: "Zone bass level, step 1 dB"

- id: zone_treble
  type: integer
  description: "Zone treble level, step 1 dB"

- id: zone_lipsync
  type: integer
  description: "Zone lip sync in ms"

- id: zone_useZone2
  type: integer
  description: "0=No, 1=Yes"

- id: frontpanel_color
  type: enum
  values: [blue, red, green, white, magenta, orange]

- id: frontpanel_stbybright
  type: integer
  description: "0..100, step 10"

- id: frontpanel_actbright
  type: integer
  description: "0..100, step 10"

- id: frontpanel_stbytime
  type: enum
  values: [2, 5, 10, 20, 30, 60]

- id: trigger_state
  type: enum
  values: [on, off]
  examples: ["ssp.trig{n}.on", "ssp.trig{n}.off"]

- id: trigger_manual
  type: enum
  values: [on, off]
  examples: ["ssp.trig{n}.manual.on", "ssp.trig{n}.manual.off"]

- id: input_stream
  type: string
  description: "Free-form stream type, e.g. contains 'DTS', 'IMAX' for dialog gates"

- id: input_sample_rate
  type: string
  description: "Sample rate code"

- id: input_format
  type: string
  description: "Input channel configuration code"

- id: hdmi_info
  type: string
  description: "HDMI output info strings: input, sync, timing, hdr, cp, colorspace, colordepth, mode"

- id: version
  type: string
  description: "Firmware version string"

- id: brand
  type: enum
  values: [StormAudio, Bryston, FOCAL]

- id: model
  type: enum
  values: [IISP, "Astral 16", "ISP Elite MK1", SP4, "ISP Elite MK2", "ISP Core 16"]

- id: msgstatus
  type: integer
  description: "Message status ID (0..99); see msg-id table - 0=empty, 1=Backup, 2=Restore, 3=Selective, 4=Reset, 5=Firmware upgrade, 6=Dirac loading, 98=msg string, 99=?"

- id: msgstatusTxt
  type: string
  description: "Tuple [id, msg]; max 256 chars"

- id: zones_profiles
  type: string
  description: "Tuple [zone_id, profile_id]"

- id: input_listing
  type: string
  description: "Multi-message dump bracketed by ssp.input.start / ssp.input.end"

- id: preset_listing
  type: string
  description: "Multi-message dump bracketed by ssp.preset.start / ssp.preset.end"

- id: zones_listing
  type: string
  description: "Multi-message dump bracketed by ssp.zones.start / ssp.zones.end"

- id: inputZone2_id
  type: integer
  description: "0 if input has no Zone2 Audio IN"

- id: inputHdmiMatrixMode
  type: enum
  values: ["0 (Mirror)", "1 (Zone2 A/V)", "2 (Pass Through)"]
  notes: "Returns 'error' without HdmiMatrix license"

- id: trigger_list
  type: string
  description: "Trigger names bracketed by ssp.trigger.start / ssp.trigger.end"

- id: surroundmode_list
  type: string
  description: "Surround mode list bracketed by ssp.surroundmode.start / ssp.surroundmode.end"

- id: auropreset_list
  type: string
  description: "Auro preset list bracketed by ssp.auropreset.start / ssp.auropreset.end"
```

## Variables
```yaml
# No variable values are separately documentable here; every settable parameter
# in the source is a discrete command with its own id/value pair. See Actions.
```

## Events
```yaml
# Broadcast notifications sent on parameter change by any interface (front panel,
# WebUI, other TCP clients). Source describes these as "the same format as the
# read commands" - every read command listed above is also a potential event.
#
# Key events:
# - ssp.power.on / ssp.power.off              (power state change)
# - ssp.mute.on / ssp.mute.off                (mute toggle)
# - ssp.vol.[-xx]                             (volume change)
# - ssp.input.[xx]                            (input change)
# - ssp.preset.[xx]                           (preset change)
# - ssp.surroundmode.[xx]                     (surround mode change)
# - ssp.zones.list.*                          (any zone field change → entire list rebroadcast)
# - ssp.preset.list.*                         (preset name or active state change)
# - ssp.input.list.*                          (any input field change)
# - ssp.trigger.list.*                        (trigger name change)
# - ssp.frontpanel.color / .stbybright / .actbright / .stbytime (front panel changes)
# - ssp.update                                (firmware update - see Notes)
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences;
# macros must be defined by integrator.
```

## Safety
```yaml
confirmation_required_for:
  - ssp.reset          # processor reboot; TCP connection lost
  - ssp.power          # power state changes affect active audio
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the ssp.power.on → ssp.procstate.2
# ready-state note.
```

## Notes
- Protocol uses Telnet port 23 (TCP). No authentication described in source.
- Frame format: ASCII, terminated by `<LF>` (`\n`). Source example: `"ssp.hdmi1.input.["HDMI 1"]"`.
- On connect, ISP broadcasts current values of every parameter.
- Any parameter change via any interface (front panel, WebUI, another TCP client) is broadcast to all connected clients.
- Unknown or out-of-range commands return the literal string `"error"`.
- `ssp.reset` causes reboot and drops TCP connection.
- `ssp.close` only closes the TCP connection; API application continues running.
- Bass/Treble/Brightness/C_en/S_en/sub_en/lfe_en maximum range depends on the WebUI "Audio Control Range MAX" setting (not exposed via TCP).
- `ssp.sub_en` is deprecated since v22-1 (use `ssp.lfe_en`).
- `ssp.IMAXMode.on` returns `ssp.IMAXMode.auto` (documented quirk in source).
- Several commands require specific hardware: HDMI Matrix / 7+2 eARC board, HMC HDMI boards for OSD, ISP Core / mk3+ for front panel navigation.
- Surround mode `ssp.allowedmode` (real) may differ from `ssp.surroundmode` (preferred) when content cannot be upmixed.
- In a SphereAudio preset, several parameters are grayed/disabled in the UI: Master Volume, Mute, Vol Dim, Center Enhance, Surround Enhance, Sub Enhance, Bass, Treble, Brightness, Lipsync, LFE Dim.
- Auro Strength, Auro Preset, DRC, Center Spread, Dialog Control, Dialog Norm, IMAX Mode, StormXT, Storm Audio modes are all conditionally visible depending on the active surround mode and source stream.

<!-- UNRESOLVED: firmware version compatibility — source states "4.6r1 and beyond" but does not specify upper bound. -->
<!-- UNRESOLVED: message-status IDs 0 and 99 — source table row is empty. -->
<!-- UNRESOLVED: trigger count (max N triggers) — source uses ssp.trig{n} but never states N. -->
<!-- UNRESOLVED: maximum number of inputs and presets — source lists examples but no numeric caps. -->
<!-- UNRESOLVED: discrete value of "xx" placeholder in feedback IDs (e.g. exact code mapping for ssp.format, ssp.stream, ssp.fs). -->

## Provenance

```yaml
source_domains:
  - stormaudio.com
source_urls:
  - https://www.stormaudio.com/wp-content/uploads/2024/10/Stormaudio_isp_tcpip_api_protocol_fw4.6r1_v23.pdf
retrieved_at: 2026-07-24T18:50:03.997Z
last_checked_at: 2026-08-05T08:49:35.992Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:49:35.992Z
matched_actions: 171
action_count: 171
confidence: medium
summary: "All 171 spec action ids have literal wire-level matches in source; transport (TCP port 23, no auth) is verbatim; source command catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Astral 16 and SP4 listed in ssp.model responses but not in compatible_with models — source lists them as models but spec is for ISP-MK series"
- "source does not document multi-step command sequences;"
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility — source states \"4.6r1 and beyond\" but does not specify upper bound."
- "message-status IDs 0 and 99 — source table row is empty."
- "trigger count (max N triggers) — source uses ssp.trig{n} but never states N."
- "maximum number of inputs and presets — source lists examples but no numeric caps."
- "discrete value of \"xx\" placeholder in feedback IDs (e.g. exact code mapping for ssp.format, ssp.stream, ssp.fs)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
