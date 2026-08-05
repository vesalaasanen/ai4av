---
spec_id: admin/stormaudio-isp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "StormAudio ISP Series Immersive Sound Processor Control Spec"
manufacturer: StormAudio
model_family: "ISP Series (Immersive Sound Processor family)"
aliases: []
compatible_with:
  manufacturers:
    - StormAudio
  models:
    - "ISP Series (Immersive Sound Processor family)"
  firmware: "4.6r1 and beyond"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - stormaudio.com
source_urls:
  - https://www.stormaudio.com/wp-content/uploads/2024/10/Stormaudio_isp_tcpip_api_protocol_fw4.6r1_v23.pdf
  - https://www.stormaudio.com/wp-content/uploads/2024/10/20250903_StormAudio_IR_Commands.pdf
retrieved_at: 2026-07-25T00:54:51.398Z
last_checked_at: 2026-08-05T08:49:11.432Z
generated_at: 2026-08-05T08:49:11.432Z
firmware_coverage: "4.6r1 and beyond"
protocol_coverage: []
known_gaps:
  - "source is a protocol manual only; electrical/power specs, physical I/O, and firmware changelog detail not included."
  - "per-zone, per-trigger, per-HDMI-output feedback states follow the"
  - "no distinct variable abstraction in source."
  - "no explicit multi-step command sequences documented in source."
  - "no explicit electrical safety, interlock voltage, or power-on"
  - "trigger count range, zone count range, and exact numeric codes for ssp.fs / ssp.stream / ssp.format not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:49:11.432Z
  matched_actions: 175
  action_count: 175
  confidence: medium
  summary: "Every one of the 175 spec actions maps 1-to-1 to a documented source command (control/status/audio/theater/zones/system/trigger/stream/HDMI/OSD/front-panel/nav), and transport (port 23 TCP, no auth) is verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# StormAudio ISP Series Immersive Sound Processor Control Spec

## Summary
StormAudio ISP family Immersive Sound Processors (IISP, Astral 16, ISP Elite MK1/MK2, SP4, ISP Core 16) controlled via a TCP/IP Telnet API on port 23. Commands and replies are ASCII strings terminated by LF. This spec covers the documented command groups: control, message status, audio configuration, theater control, zones, system configuration, trigger, stream info, HDMI info, OSD, and front panel.

<!-- UNRESOLVED: source is a protocol manual only; electrical/power specs, physical I/O, and firmware changelog detail not included. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: ssp.power.on/off/toggle documented
  - routable       # inferred: input/preset/zone selection commands documented
  - queryable      # inferred: extensive read/query commands documented
  - levelable      # inferred: volume/bass/treble/brightness level commands documented
```

## Actions
```yaml
# All commands are ASCII terminated by <LF> (\x0A). Unrecognized/out-of-range
# commands return the literal string "error". Source: TCP/IP API Control Protocol,
# ISP firmware 4.6r1 and beyond.

# --- 3.1 Control Group (accessible in sleep and on mode) ---

- id: keepalive
  label: Keepalive / Ping
  kind: action
  command: "ssp.keepalive"
  params: []

- id: procstate_query
  label: Processor State Query
  kind: query
  command: "ssp.procstate"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "ssp.power"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "ssp.power.on"
  params: []

- id: power_off
  label: Power Off (Sleep)
  kind: action
  command: "ssp.power.off"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "ssp.power.toggle"
  params: []

- id: reset
  label: Processor Reset (Reboot)
  kind: action
  command: "ssp.reset"
  params: []

- id: close_connection
  label: Close TCP Connection
  kind: action
  command: "ssp.close"
  params: []

- id: version_query
  label: Firmware Version Query
  kind: query
  command: "ssp.version"
  params: []

- id: brand_query
  label: Brand Query
  kind: query
  command: "ssp.brand"
  params: []

- id: model_query
  label: Processor Model Query
  kind: query
  command: "ssp.model"
  params: []

# --- 3.2 Message Status Group (active mode only) ---

- id: msgstatus_query
  label: Message Status Query
  kind: query
  command: "ssp.msgstatus"
  params: []

- id: msgstatus_txt_query
  label: Message Status Text Query
  kind: query
  command: "ssp.msgstatusTxt"
  params: []

# --- 3.3.1 Audio Configuration: Inputs ---

- id: input_query
  label: Active Input Query
  kind: query
  command: "ssp.input"
  params: []

- id: input_select
  label: Select Input
  kind: action
  command: "ssp.input.[{id}]"
  params:
    - name: id
      type: integer
      description: Input ID

- id: input_zone2_select
  label: Select Audio Zone2 Input
  kind: action
  command: "ssp.inputZone2.[{id}]"
  params:
    - name: id
      type: integer
      description: Input ID

- id: input_next
  label: Select Next Input
  kind: action
  command: "ssp.input.next"
  params: []

- id: input_prev
  label: Select Previous Input
  kind: action
  command: "ssp.input.prev"
  params: []

- id: input_list
  label: List Configured Inputs
  kind: query
  command: "ssp.input.list"
  params: []

- id: input_hdmi_matrix_mode_query
  label: HDMI Matrix Mode Query
  kind: query
  command: "ssp.inputHdmiMatrixMode"
  params: []

- id: input_hdmi_passthru_select
  label: Select HDMI Pass Through Input
  kind: action
  command: "ssp.inputHdmiPassThru.[{id}]"
  params:
    - name: id
      type: integer
      description: Input ID (or 0)

# --- 3.3.2 Preset ---

- id: preset_query
  label: Active Preset Query
  kind: query
  command: "ssp.preset"
  params: []

- id: preset_select
  label: Select Preset
  kind: action
  command: "ssp.preset.[{id}]"
  params:
    - name: id
      type: integer
      description: Preset ID

- id: preset_next
  label: Select Next Preset
  kind: action
  command: "ssp.preset.next"
  params: []

- id: preset_prev
  label: Select Previous Preset
  kind: action
  command: "ssp.preset.prev"
  params: []

- id: preset_list
  label: List Configured Presets
  kind: query
  command: "ssp.preset.list"
  params: []

- id: preset_custom_query
  label: Preset Custom Status Query
  kind: query
  command: "ssp.preset.custom"
  params: []

# --- 3.3.3 Surround Mode ---

- id: surroundmode_query
  label: Preferred Surround Mode Query
  kind: query
  command: "ssp.surroundmode"
  params: []

- id: surroundmode_select
  label: Select Surround Mode
  kind: action
  command: "ssp.surroundmode.[{id}]"
  params:
    - name: id
      type: integer
      description: Surround mode ID (0 Native, 1 Stereo Downmix, 2 Dolby Surround, 3 DTS Neural:X, 4 Auro-Matic)

- id: surroundmode_list
  label: List Surround Modes
  kind: query
  command: "ssp.surroundmode.list"
  params: []

- id: allowedmode_query
  label: Active (Allowed) Surround Mode Query
  kind: query
  command: "ssp.allowedmode"
  params: []

# --- 3.3.4 Active Speaker ---

- id: speaker_query
  label: Active Speaker Config Query
  kind: query
  command: "ssp.speaker"
  params: []

# --- 3.4.1 Mute ---

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "ssp.mute"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "ssp.mute.on"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "ssp.mute.off"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "ssp.mute.toggle"
  params: []

# --- 3.4.2 Dim ---

- id: dim_query
  label: Dim Status Query
  kind: query
  command: "ssp.dim"
  params: []

- id: dim_on
  label: Dim On
  kind: action
  command: "ssp.dim.on"
  params: []

- id: dim_off
  label: Dim Off
  kind: action
  command: "ssp.dim.off"
  params: []

- id: dim_toggle
  label: Dim Toggle
  kind: action
  command: "ssp.dim.toggle"
  params: []

# --- 3.4.3 Volume (range -0 to -100) ---

- id: volume_query
  label: Volume Level Query
  kind: query
  command: "ssp.vol"
  params: []

- id: volume_up
  label: Volume Up (+1.0 dB)
  kind: action
  command: "ssp.vol.up"
  params: []

- id: volume_down
  label: Volume Down (-1.0 dB)
  kind: action
  command: "ssp.vol.down"
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: "ssp.vol.[-{level}]"
  params:
    - name: level
      type: integer
      description: Volume level (0 to 100)

# --- 3.4.4 Loudness (range 0 to 3) ---

- id: loudness_query
  label: Loudness Level Query
  kind: query
  command: "ssp.loudness"
  params: []

- id: loudness_set
  label: Set Loudness Level
  kind: action
  command: "ssp.loudness.[{level}]"
  params:
    - name: level
      type: integer
      description: Loudness level (0 Off, 1 Low, 2 Medium, 3 Full)

# --- 3.4.5 Bass (range -6 to 6, step 1 dB) ---

- id: bass_query
  label: Bass Level Query
  kind: query
  command: "ssp.bass"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "ssp.bass.up"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "ssp.bass.down"
  params: []

- id: bass_set
  label: Set Bass
  kind: action
  command: "ssp.bass.[{level}]"
  params:
    - name: level
      type: integer
      description: Bass level (-6 to 6)

# --- 3.4.6 Treble (range -6 to 6, step 1 dB) ---

- id: treble_query
  label: Treble Level Query
  kind: query
  command: "ssp.treble"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "ssp.treble.up"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "ssp.treble.down"
  params: []

- id: treble_set
  label: Set Treble
  kind: action
  command: "ssp.treble.[{level}]"
  params:
    - name: level
      type: integer
      description: Treble level (-6 to 6)

# Deprecated treble aliases (source lists as distinct rows)
- id: treb_query_deprecated
  label: Treble Query (DEPRECATED, use ssp.treble)
  kind: query
  command: "ssp.treb"
  params: []

- id: treb_up_deprecated
  label: Treble Up (DEPRECATED, use ssp.treble.up)
  kind: action
  command: "ssp.treb.up"
  params: []

- id: treb_down_deprecated
  label: Treble Down (DEPRECATED, use ssp.treble.down)
  kind: action
  command: "ssp.treb.down"
  params: []

- id: treb_set_deprecated
  label: Set Treble (DEPRECATED, use ssp.treble.[xx])
  kind: action
  command: "ssp.treb.[{level}]"
  params:
    - name: level
      type: integer
      description: Treble level (-6 to 6)

# --- 3.4.7 Brightness (range -6 to 6, step 1 dB) ---

- id: brightness_query
  label: Brightness Level Query
  kind: query
  command: "ssp.brightness"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "ssp.brightness.up"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "ssp.brightness.down"
  params: []

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "ssp.brightness.[{level}]"
  params:
    - name: level
      type: integer
      description: Brightness level (-6 to 6)

# --- 3.4.8 Center Enhance (range -6 to 6, step 1 dB) ---

- id: c_en_query
  label: Center Enhance Query
  kind: query
  command: "ssp.c_en"
  params: []

- id: c_en_up
  label: Center Enhance Up
  kind: action
  command: "ssp.c_en.up"
  params: []

- id: c_en_down
  label: Center Enhance Down
  kind: action
  command: "ssp.c_en.down"
  params: []

- id: c_en_set
  label: Set Center Enhance
  kind: action
  command: "ssp.c_en.[{level}]"
  params:
    - name: level
      type: integer
      description: Center enhance level (-6 to 6)

# --- 3.4.9 Surround Enhance (range -6 to 6, step 1 dB) ---

- id: s_en_query
  label: Surround Enhance Query
  kind: query
  command: "ssp.s_en"
  params: []

- id: s_en_up
  label: Surround Enhance Up
  kind: action
  command: "ssp.s_en.up"
  params: []

- id: s_en_down
  label: Surround Enhance Down
  kind: action
  command: "ssp.s_en.down"
  params: []

- id: s_en_set
  label: Set Surround Enhance
  kind: action
  command: "ssp.s_en.[{level}]"
  params:
    - name: level
      type: integer
      description: Surround enhance level (-6 to 6)

# --- 3.4.10 Sub Enhance (DEPRECATED, use Lfe enhance) ---

- id: sub_en_query
  label: Sub Enhance Query (DEPRECATED, use ssp.lfe_en)
  kind: query
  command: "ssp.sub_en"
  params: []

- id: sub_en_up
  label: Sub Enhance Up (DEPRECATED)
  kind: action
  command: "ssp.sub_en.up"
  params: []

- id: sub_en_down
  label: Sub Enhance Down (DEPRECATED)
  kind: action
  command: "ssp.sub_en.down"
  params: []

- id: sub_en_set
  label: Set Sub Enhance (DEPRECATED)
  kind: action
  command: "ssp.sub_en.[{level}]"
  params:
    - name: level
      type: integer
      description: Sub enhance level (-6 to 6)

# --- 3.4.11 Lfe Enhance (range -6 to 6, step 1 dB) ---

- id: lfe_en_query
  label: Lfe Enhance Query
  kind: query
  command: "ssp.lfe_en"
  params: []

- id: lfe_en_up
  label: Lfe Enhance Up
  kind: action
  command: "ssp.lfe_en.up"
  params: []

- id: lfe_en_down
  label: Lfe Enhance Down
  kind: action
  command: "ssp.lfe_en.down"
  params: []

- id: lfe_en_set
  label: Set Lfe Enhance
  kind: action
  command: "ssp.lfe_en.[{level}]"
  params:
    - name: level
      type: integer
      description: Lfe enhance level (-6 to 6)

# --- 3.4.12 Lip Sync ---

- id: lipsync_query
  label: Lip Sync Query
  kind: query
  command: "ssp.lipsync"
  params: []

- id: lipsync_up
  label: Lip Sync Up (+5 ms)
  kind: action
  command: "ssp.lipsync.up"
  params: []

- id: lipsync_down
  label: Lip Sync Down (-5 ms)
  kind: action
  command: "ssp.lipsync.down"
  params: []

- id: lipsync_set
  label: Set Lip Sync
  kind: action
  command: "ssp.lipsync.[{level}]"
  params:
    - name: level
      type: integer
      description: Lip sync delay in ms

# --- 3.4.13.1 Auro Strength (0 to 15) ---

- id: aurostrength_query
  label: Auro Strength Query
  kind: query
  command: "ssp.aurostrength"
  params: []

- id: aurostrength_set
  label: Set Auro Strength
  kind: action
  command: "ssp.aurostrength.[{level}]"
  params:
    - name: level
      type: integer
      description: Auro strength (0 to 15)

# --- 3.4.13.2 Auro Preset ---

- id: auropreset_query
  label: Auro Preset Query
  kind: query
  command: "ssp.auropreset"
  params: []

- id: auropreset_set
  label: Set Auro Preset
  kind: action
  command: "ssp.auropreset.[{id}]"
  params:
    - name: id
      type: integer
      description: Auro preset ID (0 Small, 1 Medium, 2 Large, 3 Speech)

- id: auropreset_list
  label: List Auro Presets
  kind: query
  command: "ssp.auropreset.list"
  params: []

# --- 3.4.13.3 DRC ---

- id: drc_query
  label: DRC Status Query
  kind: query
  command: "ssp.drc"
  params: []

- id: drc_on
  label: DRC On
  kind: action
  command: "ssp.drc.on"
  params: []

- id: drc_off
  label: DRC Off
  kind: action
  command: "ssp.drc.off"
  params: []

- id: drc_auto
  label: DRC Auto
  kind: action
  command: "ssp.drc.auto"
  params: []

# --- 3.4.13.4 Center Spread ---

- id: cspread_query
  label: Center Spread Query
  kind: query
  command: "ssp.cspread"
  params: []

- id: cspread_on
  label: Center Spread On
  kind: action
  command: "ssp.cspread.on"
  params: []

- id: cspread_off
  label: Center Spread Off
  kind: action
  command: "ssp.cspread.off"
  params: []

- id: cspread_toggle
  label: Center Spread Toggle
  kind: action
  command: "ssp.cspread.toggle"
  params: []

# --- 3.4.13.5 Dialog Control (0 to 6 dB) ---

- id: dialogcontrol_query
  label: Dialog Control Query
  kind: query
  command: "ssp.dialogcontrol"
  params: []

- id: dialogcontrol_set
  label: Set Dialog Control Level
  kind: action
  command: "ssp.dialogcontrol.[{level}]"
  params:
    - name: level
      type: integer
      description: Dialog control level in dB (0 to 6)

# --- 3.4.13.6 Dialog Norm ---

- id: dialognorm_query
  label: Dialog Norm Query
  kind: query
  command: "ssp.dialognorm"
  params: []

- id: dialognorm_on
  label: Dialog Norm On
  kind: action
  command: "ssp.dialognorm.on"
  params: []

- id: dialognorm_off
  label: Dialog Norm Off
  kind: action
  command: "ssp.dialognorm.off"
  params: []

- id: dialognorm_toggle
  label: Dialog Norm Toggle
  kind: action
  command: "ssp.dialognorm.toggle"
  params: []

# --- 3.4.13.7 IMAX Mode ---

- id: imaxmode_query
  label: IMAX Mode Query
  kind: query
  command: "ssp.IMAXMode"
  params: []

- id: imaxmode_on
  label: IMAX Mode On
  kind: action
  command: "ssp.IMAXMode.on"
  params: []

- id: imaxmode_off
  label: IMAX Mode Off
  kind: action
  command: "ssp.IMAXMode.off"
  params: []

- id: imaxmode_auto
  label: IMAX Mode Auto
  kind: action
  command: "ssp.IMAXMode.auto"
  params: []

# --- 3.4.13.8 StormXT ---

- id: stormxt_query
  label: StormXT Query
  kind: query
  command: "ssp.stormxt"
  params: []

- id: stormxt_on
  label: StormXT On
  kind: action
  command: "ssp.stormxt.on"
  params: []

- id: stormxt_off
  label: StormXT Off
  kind: action
  command: "ssp.stormxt.off"
  params: []

- id: stormxt_toggle
  label: StormXT Toggle
  kind: action
  command: "ssp.stormxt.toggle"
  params: []

# --- 3.4.13.9 Dolby Mode ---

- id: dolbymode_query
  label: Dolby Mode Query
  kind: query
  command: "ssp.dolbymode"
  params: []

- id: dolbymode_set
  label: Set Dolby Mode
  kind: action
  command: "ssp.dolbymode.[{mode}]"
  params:
    - name: mode
      type: integer
      description: Dolby mode (0 Off, 1 Movie, 2 Music, 3 Night)

# --- 3.4.13.9 Dolby Virtualizer ---

- id: dolbyvirtualizer_query
  label: Dolby Virtualizer Query
  kind: query
  command: "ssp.dolbyvirtualizer"
  params: []

- id: dolbyvirtualizer_on
  label: Dolby Virtualizer On
  kind: action
  command: "ssp.dolbyvirtualizer.on"
  params: []

- id: dolbyvirtualizer_off
  label: Dolby Virtualizer Off
  kind: action
  command: "ssp.dolbyvirtualizer.off"
  params: []

- id: dolbyvirtualizer_toggle
  label: Dolby Virtualizer Toggle
  kind: action
  command: "ssp.dolbyvirtualizer.toggle"
  params: []

# --- 3.4.14 SphereAudio Effect ---

- id: spheraudioeffect_query
  label: SphereAudio Effect Query
  kind: query
  command: "ssp.spheraudioeffect"
  params: []

- id: spheraudioeffect_set
  label: Set SphereAudio Effect
  kind: action
  command: "ssp.spheraudioeffect.[{effect}]"
  params:
    - name: effect
      type: integer
      description: Effect (0 ByPass, 1 Lounge, 2 Home Cinema, 3 Concert, 4 Cinema)

# --- 3.4.15 LFE Dim ---

- id: lfedim_query
  label: LFE Dim Query
  kind: query
  command: "ssp.lfedim"
  params: []

- id: lfedim_on
  label: LFE Dim On
  kind: action
  command: "ssp.lfedim.on"
  params: []

- id: lfedim_off
  label: LFE Dim Off
  kind: action
  command: "ssp.lfedim.off"
  params: []

- id: lfedim_toggle
  label: LFE Dim Toggle
  kind: action
  command: "ssp.lfedim.toggle"
  params: []

# --- 3.5 Zones Control Group (parameterized by zone ID) ---

- id: zones_list
  label: List Configured Zones
  kind: query
  command: "ssp.zones.list"
  params: []

- id: zones_lipsync_set
  label: Set Zone Lip Sync
  kind: action
  command: "ssp.zones.lipsync.[{zone_id}, {level}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: level
      type: integer
      description: Lip sync value

- id: zones_volume_set
  label: Set Zone Volume
  kind: action
  command: "ssp.zones.volume.[{zone_id}, {level}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: level
      type: integer
      description: Volume level (0 to 100)

- id: zones_volume_up
  label: Zone Volume Up
  kind: action
  command: "ssp.zones.volume.up.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_volume_down
  label: Zone Volume Down
  kind: action
  command: "ssp.zones.volume.down.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_eq_set
  label: Set Zone EQ
  kind: action
  command: "ssp.zones.eq.[{zone_id}, {value}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: value
      type: integer
      description: EQ state (0 No, 1 Yes)

- id: zones_eq_toggle
  label: Zone EQ Toggle
  kind: action
  command: "ssp.zones.eq.toggle.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_mute_set
  label: Set Zone Mute
  kind: action
  command: "ssp.zones.mute.[{zone_id}, {value}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: value
      type: integer
      description: Mute state (0 No, 1 Yes)

- id: zones_mute_toggle
  label: Zone Mute Toggle
  kind: action
  command: "ssp.zones.mute.toggle.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_bass_set
  label: Set Zone Bass
  kind: action
  command: "ssp.zones.bass.[{zone_id}, {level}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: level
      type: integer
      description: Bass level (step 1 dB)

- id: zones_treble_set
  label: Set Zone Treble
  kind: action
  command: "ssp.zones.treble.[{zone_id}, {level}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: level
      type: integer
      description: Treble level (step 1 dB)

- id: zones_mode_set
  label: Set Zone (Binaural) Mode
  kind: action
  command: "ssp.zones.mode.[{zone_id}, {value}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: value
      type: integer
      description: Mode (0 Stereo, 1 Binaural)

- id: zones_mode_toggle
  label: Zone Mode Toggle
  kind: action
  command: "ssp.zones.mode.toggle.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_usezone2_set
  label: Set Zone Use Zone2
  kind: action
  command: "ssp.zones.useZone2.[{zone_id}, {value}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: value
      type: integer
      description: Use Zone2 (0 No, 1 Yes)

- id: zones_usezone2_toggle
  label: Zone Use Zone2 Toggle
  kind: action
  command: "ssp.zones.useZone2.toggle.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_loudness_set
  label: Set Zone Loudness
  kind: action
  command: "ssp.zones.loudness.[{zone_id}, {level}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: level
      type: integer
      description: Loudness value (0 to 3)

- id: zones_loudness_get
  label: Get Zone Loudness
  kind: query
  command: "ssp.zones.loudness.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_profiles_list_all
  label: List All Zone Profiles
  kind: query
  command: "ssp.zones.profiles.list"
  params: []

- id: zones_profiles_list_zone
  label: List Profiles Within Zone
  kind: query
  command: "ssp.zones.profiles.list[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_profiles_get
  label: Get Active Profile For Zone
  kind: query
  command: "ssp.zones.profiles.[{zone_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID

- id: zones_profiles_assign
  label: Assign Active Profile For Zone
  kind: action
  command: "ssp.zones.profiles.[{zone_id}, {profile_id}]"
  params:
    - name: zone_id
      type: integer
      description: Zone ID
    - name: profile_id
      type: integer
      description: Profile ID

# --- 3.6.1 Front Panel ---

- id: frontpanel_color_query
  label: Front Panel Color Query
  kind: query
  command: "ssp.frontpanel.color"
  params: []

- id: frontpanel_color_set
  label: Set Front Panel Color
  kind: action
  command: "ssp.frontpanel.color.[{color}]"
  params:
    - name: color
      type: string
      description: Color name (blue, red, green, white, magenta, orange)

- id: frontpanel_stbybright_query
  label: Front Panel Standby Brightness Query
  kind: query
  command: "ssp.frontpanel.stbybright"
  params: []

- id: frontpanel_stbybright_set
  label: Set Front Panel Standby Brightness
  kind: action
  command: "ssp.frontpanel.stbybright.[{level}]"
  params:
    - name: level
      type: integer
      description: Standby brightness (0 to 100, step 10)

- id: frontpanel_actbright_query
  label: Front Panel Active Brightness Query
  kind: query
  command: "ssp.frontpanel.actbright"
  params: []

- id: frontpanel_actbright_set
  label: Set Front Panel Active Brightness
  kind: action
  command: "ssp.frontpanel.actbright.[{level}]"
  params:
    - name: level
      type: integer
      description: Active brightness (0 to 100, step 10)

- id: frontpanel_stbytime_query
  label: Front Panel Standby Delay Query
  kind: query
  command: "ssp.frontpanel.stbytime"
  params: []

- id: frontpanel_stbytime_set
  label: Set Front Panel Standby Delay
  kind: action
  command: "ssp.frontpanel.stbytime.[{seconds}]"
  params:
    - name: seconds
      type: integer
      description: Standby delay (allowed 2, 5, 10, 20, 30, 60)

# --- 3.7.1 Trigger (parameterized by trigger number X) ---

- id: trigger_query
  label: Trigger Status Query
  kind: query
  command: "ssp.trig{trigger_id}"
  params:
    - name: trigger_id
      type: integer
      description: Trigger number (X)

- id: trigger_on
  label: Trigger On
  kind: action
  command: "ssp.trig{trigger_id}.on"
  params:
    - name: trigger_id
      type: integer
      description: Trigger number (X)

- id: trigger_off
  label: Trigger Off
  kind: action
  command: "ssp.trig{trigger_id}.off"
  params:
    - name: trigger_id
      type: integer
      description: Trigger number (X)

- id: trigger_manual
  label: Trigger Manual Mode Query
  kind: query
  command: "ssp.trig{trigger_id}.manual"
  params:
    - name: trigger_id
      type: integer
      description: Trigger number (X)

- id: trigger_toggle
  label: Trigger Toggle
  kind: action
  command: "ssp.trig{trigger_id}.toggle"
  params:
    - name: trigger_id
      type: integer
      description: Trigger number (X)

- id: trigger_list
  label: Trigger Name List
  kind: query
  command: "ssp.trigger.list"
  params: []

# --- 3.8 Stream Info Group ---

- id: sample_rate_query
  label: Input Stream Sample Rate Query
  kind: query
  command: "ssp.fs"
  params: []

- id: stream_type_query
  label: Input Stream Type Query
  kind: query
  command: "ssp.stream"
  params: []

- id: format_query
  label: Input Channel Configuration Query
  kind: query
  command: "ssp.format"
  params: []

# --- 3.9.1 HDMI Video Info (parameterized by HDMI output X = 1 or 2) ---

- id: hdmi_input_query
  label: HDMI Video In Info Query
  kind: query
  command: "ssp.hdmi{output_id}.input"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_sync_query
  label: HDMI Sync Info Query
  kind: query
  command: "ssp.hdmi{output_id}.sync"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_timing_query
  label: HDMI Timing Info Query
  kind: query
  command: "ssp.hdmi{output_id}.timing"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_hdr_query
  label: HDMI HDR Info Query
  kind: query
  command: "ssp.hdmi{output_id}.hdr"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_cp_query
  label: HDMI Copy Protection Info Query
  kind: query
  command: "ssp.hdmi{output_id}.cp"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_colorspace_query
  label: HDMI Color Space Info Query
  kind: query
  command: "ssp.hdmi{output_id}.colorspace"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_colordepth_query
  label: HDMI Color Depth Info Query
  kind: query
  command: "ssp.hdmi{output_id}.colordepth"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

- id: hdmi_mode_query
  label: HDMI Mode Info Query
  kind: query
  command: "ssp.hdmi{output_id}.mode"
  params:
    - name: output_id
      type: integer
      description: HDMI output (1 or 2)

# --- 3.10.1 OSD Info panel (HMC HDMI boards only) ---

- id: osd_info_toggle
  label: OSD Extended Info Toggle
  kind: action
  command: "ssp.osd.info"
  params: []

# --- 3.11.1 Front Panel Display Status (ISP Core / mk3+) ---

- id: display_toggle
  label: Display On/Off Toggle
  kind: action
  command: "ssp.display.toggle"
  params: []

# --- 3.11.2 Navigation (ISP Core / mk3+) ---

- id: nav_up
  label: Navigate Up
  kind: action
  command: "ssp.nav.up"
  params: []

- id: nav_down
  label: Navigate Down
  kind: action
  command: "ssp.nav.down"
  params: []

- id: nav_left
  label: Navigate Left
  kind: action
  command: "ssp.nav.left"
  params: []

- id: nav_right
  label: Navigate Right
  kind: action
  command: "ssp.nav.right"
  params: []

- id: nav_ok
  label: Navigate OK / Enter
  kind: action
  command: "ssp.nav.ok"
  params: []

- id: nav_back
  label: Navigate Back
  kind: action
  command: "ssp.nav.back"
  params: []
```

## Feedbacks
```yaml
# Observable states returned by read commands and broadcast on change.
# Per source, any parameter changed by another interface is broadcast to all
# connected clients in the same format as the corresponding read reply.

- id: power_state
  type: enum
  values: [on, off]
  command: "ssp.power"

- id: procstate
  type: enum
  values: [off_sleep, init_or_shutdown, on]
  command: "ssp.procstate"

- id: mute_state
  type: enum
  values: [on, off]
  command: "ssp.mute"

- id: dim_state
  type: enum
  values: [on, off]
  command: "ssp.dim"

- id: volume_level
  type: number
  command: "ssp.vol"

- id: input_active
  type: number
  command: "ssp.input"

- id: preset_active
  type: number
  command: "ssp.preset"

- id: surroundmode_preferred
  type: number
  command: "ssp.surroundmode"

- id: allowedmode_active
  type: number
  command: "ssp.allowedmode"

- id: loudness_level
  type: number
  command: "ssp.loudness"

- id: bass_level
  type: number
  command: "ssp.bass"

- id: treble_level
  type: number
  command: "ssp.treble"

- id: brightness_level
  type: number
  command: "ssp.brightness"

- id: firmware_version
  type: string
  command: "ssp.version"

- id: brand
  type: enum
  values: [StormAudio, Bryston, FOCAL]
  command: "ssp.brand"

- id: model
  type: enum
  values: [IISP, Astral 16, ISP Elite MK1, SP4, ISP Elite MK2, ISP Core 16]
  command: "ssp.model"

- id: msgstatus
  type: number
  command: "ssp.msgstatus"

- id: stream_type
  type: string
  command: "ssp.stream"

- id: sample_rate
  type: number
  command: "ssp.fs"

- id: input_format
  type: string
  command: "ssp.format"

# UNRESOLVED: per-zone, per-trigger, per-HDMI-output feedback states follow the
# same read-reply format with embedded IDs (ssp.zones.*, ssp.trigX.*, ssp.hdmiX.*);
# enumerated above as parameterized query actions.
```

## Variables
```yaml
# Settable continuous/level parameters are exposed as discrete set actions in
# this protocol (see Actions). No separate variable model documented.
# UNRESOLVED: no distinct variable abstraction in source.
```

## Events
```yaml
# Per source: when a connection is first established the ISP sends the current
# value of ALL parameters to the connecting device (each as an individual message
# in read-reply format). Whenever any API-accessible parameter changes via another
# process/interface (e.g. front panel), the new value is broadcast to ALL
# connected devices in the same format as the corresponding read command.
#
# Example broadcast: pressing the front-panel mute knob emits "ssp.mute.on" to
# every connected client. List-style commands stream framed by *.start / *.end
# markers (ssp.input.list, ssp.preset.list, ssp.zones.list,
# ssp.surroundmode.list, ssp.auropreset.list, ssp.zones.profiles.list,
# ssp.trigger.list).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "ssp.reset reboots the processor; the TCP connection will be lost during reset."
  - "Most command groups (audio config, theater, zones, system, trigger, stream, HDMI, OSD, front panel) are only accessible in active/on mode; reads/writes in sleep mode return 'ssp.power.off'."
  - "ssp.power.on returns 'ssp.power.on' immediately but the processor is only fully operational once 'ssp.procstate.[2]' is received."
# UNRESOLVED: no explicit electrical safety, interlock voltage, or power-on
# sequencing warnings stated in this protocol document.
```

## Notes
- Commands and replies are ASCII terminated by LF (`\x0A`). Any unrecognized or out-of-range command returns the literal string `error`.
- License-gated features return `error` when unlicensed: HDMI Matrix mode (`ssp.inputHdmi*`), SphereAudio (`ssp.spheraudioeffect`, `ssp.zones.mode.*`), StormXT (`ssp.stormxt.*`).
- Deprecated command aliases still documented: `ssp.treb*` (use `ssp.treble*`), `ssp.sub_en*` (use `ssp.lfe_en*`).
- Some features are board/model-specific: `ssp.osd.info` (HMC HDMI boards only); `ssp.display.toggle` and `ssp.nav.*` (ISP Core and ISP mk3 or superior); `ssp.inputHdmi*` (7+2 eARC board).
- Source: TCP/IP API – Control Protocol, ISP firmware version 4.6r1 and beyond (document history v23, 1 oct. 2024).

<!-- UNRESOLVED: trigger count range, zone count range, and exact numeric codes for ssp.fs / ssp.stream / ssp.format not enumerated in source. -->
```

Spec generated. ~120 actions enumerated across all 11 documented command groups (control, msg status, audio config, theater, zones, system, trigger, stream, HDMI, OSD, front panel/nav). Port 23, no-auth, LF-terminated ASCII all from source. Deprecated treble/sub_en aliases included as distinct rows per coverage rule. License-gated + board-specific features flagged in Notes/Safety.

## Provenance

```yaml
source_domains:
  - stormaudio.com
source_urls:
  - https://www.stormaudio.com/wp-content/uploads/2024/10/Stormaudio_isp_tcpip_api_protocol_fw4.6r1_v23.pdf
  - https://www.stormaudio.com/wp-content/uploads/2024/10/20250903_StormAudio_IR_Commands.pdf
retrieved_at: 2026-07-25T00:54:51.398Z
last_checked_at: 2026-08-05T08:49:11.432Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:49:11.432Z
matched_actions: 175
action_count: 175
confidence: medium
summary: "Every one of the 175 spec actions maps 1-to-1 to a documented source command (control/status/audio/theater/zones/system/trigger/stream/HDMI/OSD/front-panel/nav), and transport (port 23 TCP, no auth) is verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a protocol manual only; electrical/power specs, physical I/O, and firmware changelog detail not included."
- "per-zone, per-trigger, per-HDMI-output feedback states follow the"
- "no distinct variable abstraction in source."
- "no explicit multi-step command sequences documented in source."
- "no explicit electrical safety, interlock voltage, or power-on"
- "trigger count range, zone count range, and exact numeric codes for ssp.fs / ssp.stream / ssp.format not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
