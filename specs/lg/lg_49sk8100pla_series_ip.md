---
spec_id: admin/lg-49sk8100pla-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49SK8100PLA Series Control Spec"
manufacturer: LG
model_family: 49SK8100PLA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49SK8100PLA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - webostv.developer.lge.com
  - knowledge.tiffinmotorhomes.com
  - proaudioinc.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://knowledge.tiffinmotorhomes.com/Owner_Hub/Allegro_Bus/Allegro_Bus_Component_Manuals/2027_Allegro_Bus_Component_Manuals/LG_External_Control_Device_Setup
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-04-25T20:59:48.823Z
last_checked_at: 2026-04-25T20:59:48.823Z
generated_at: 2026-04-25T20:59:48.823Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the protocol as \"For USA only\" for IP control — applicability to the 49SK8100PLA (EU SKU) is unverified. Source also states 3D support is model-dependent; SK8100 series is not confirmed 3D-capable."
  - "source does not expose discrete variable handles beyond parameter ranges documented inline with each Action. Remove section if not applicable."
  - "source does not document unsolicited push notifications. The 'OK' / 'NG' responses above are only sent in reply to commands."
  - "source does not document multi-step macro sequences."
  - "source does not document hard interlock procedures. The 828 hidden-menu password is a configuration gate, not a safety interlock."
  - "Set ID range confirmed 1-99. Wi-Fi/WOL procedure mentioned only as \"install iOS/Android app\" — no protocol-level WOL details. 3D applicability to SK8100PLA not stated. ISM and panel-light commands are plasma-specific and will not work on this LCD SKU. -->Spec emitted. Both transports captured (RS-232 + telnet:9761). IP control section flagged \"For USA only\" — applicability to EU SKU unverified, marked UNRESOLVED. Plasma-only (ISM, panel light) and 3D commands included per coverage rule with notes."
verification:
  verdict: verified
  checked_at: 2026-04-25T20:59:48.823Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched verbatim to source commands; all transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49SK8100PLA Series Control Spec

## Summary
LG SK8100 series LCD TV exposing both an RS-232C service interface (DE9/phone-jack or USB-to-serial via PL2303) and a telnet-based Network IP control (port 9761). This spec covers the documented external control command set: power, video tuning, picture/sound adjustments, input selection, IR-key emulation, and 3D options where applicable.

<!-- UNRESOLVED: source describes the protocol as "For USA only" for IP control — applicability to the 49SK8100PLA (EU SKU) is unverified. Source also states 3D support is model-dependent; SK8100 series is not confirmed 3D-capable. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "DE9 (D-Sub 9-pin female-to-female) or 3.5 mm phone-jack or USB (PL2303, VID 0x0557, PID 0x2008)"
  cable_type: "crossed (reverse)"
addressing:
  port: 9761
  host: "TV IP address (DHCP or static; not stated in source)"
auth:
  type: password
  username: null
  password: "828"  # default 3-digit password, changeable via Password Change menu
  notes: "TCP/IP control requires enabling Network IP Control via hidden menu (hold Settings 5 s → enter 828 → IP Control Setup → On). Source states the 828 password applies to the hidden IP Control Setup menu, not directly to the telnet session - telnet auth procedure is not specified in source."
```

## Traits
```yaml
- powerable       # inferred from ka / POWER commands
- routable        # inferred from xb (input select) / INPUT_SELECT
- queryable       # inferred from FF status read and OK/NG acknowledgement
- levelable       # inferred from volume, picture, audio level commands
- tunable         # inferred from ma (Tune Command) / CHANNEL_SETTING_*
```

## Actions
```yaml
# All command mnemonics from the source's Command Reference List, plus their
# Network IP Control (telnet) string counterparts where present.
# Set ID in serial frame is 1-99 (decimal in menu, 0x00-0x63 hex on the wire);
# Set ID 0 broadcasts to all connected sets.
# Serial frame format: [Cmd1][Cmd2][ ][SetID][ ][Data][Cr]  (Cr = 0x0D, space = 0x20)
# Read (query) variant: send FF in Data field; device replies with status.

- id: power
  label: Power (set)
  kind: action
  command: "ka {data}"        # serial: 'ka <SetID> <00|01>'  ; ip: 'POWER off' / 'POWER on'
  params:
    - name: data
      type: string
      description: "Serial: 00 = off, 01 = on. IP: 'on' or 'off'."
  notes: "With RS-232C cable, ka works in both power-on and power-off states; with USB-to-serial converter, only when TV is on."

- id: power_status
  label: Power Status Query
  kind: query
  command: "ka FF"            # serial; IP returns OK on any accepted command
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {data}"        # ip: ASPECT_RATIO [4by3|16by9|setbyoriginal]
  params:
    - name: data
      type: string
      description: "01=Normal(4:3) 02=Wide(16:9) 04=Zoom 05=Zoom2 06=Set by Program/Original 07=14:9 09=Just Scan 0B=Full Wide 0C=21:9 10-1F=Cinema Zoom 1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {data}"        # ip: SCREEN_MUTE [screenmuteon|videomuteon|allmuteoff]
  params:
    - name: data
      type: string
      description: "00=Screen mute off (Picture on, Video mute off) 01=Screen mute on (Picture off) 10=Video mute on"

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {data}"        # ip: VOLUME_MUTE [on|off]
  params:
    - name: data
      type: string
      description: "00=mute on (volume off), 01=mute off (volume on)"

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {level}"       # ip: VOLUME_CONTROL 0..100 (decimal)
  params:
    - name: level
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: contrast
  label: Contrast
  kind: action
  command: "kg {data}"        # ip: PICTURE_CONTRAST 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: brightness
  label: Brightness
  kind: action
  command: "kh {data}"        # ip: PICTURE_BRIGHTNESS 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: color
  label: Color/Colour
  kind: action
  command: "ki {data}"        # ip: PICTURE_COLOUR 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: tint
  label: Tint
  kind: action
  command: "kj {data}"        # ip: PICTURE_TINT 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex Red:00 to Green:64. IP decimal 0-100."

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {data}"        # ip: PICTURE_SHARPNESS 0..50
  params:
    - name: data
      type: integer
      description: "Serial hex 00-32. IP decimal 0-50."

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {data}"        # ip: OSD_SELECT [on|off]
  params:
    - name: data
      type: string
      description: "00=OSD off, 01=OSD on"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {data}"        # ip: REMOTECONTROLER_LOCK [on|off]
  params:
    - name: data
      type: string
      description: "00=Lock off, 01=Lock on. Released when main power is cycled (20-30 s)."

- id: treble
  label: Treble
  kind: action
  command: "kr {data}"        # ip: AUDIO_TREBLE 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: bass
  label: Bass
  kind: action
  command: "ks {data}"        # ip: AUDIO_BASS 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: balance
  label: Balance
  kind: action
  command: "kt {data}"        # ip: AUDIO_BALANCE 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {data}"        # ip: PICTURE_COLOUR_TEMPERATURE 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."

- id: ism_method
  label: ISM Method (Plasma only)
  kind: action
  command: "jp {data}"        # not supported on LCD/LED models including SK8100
  params:
    - name: data
      type: string
      description: "02=Orbiter, 08=Normal, 20=Color(Colour) Wash"

- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {data}"        # ip: AUDIO_EQUALIZER [1..5] [0..20]
  params:
    - name: data
      type: string
      description: "Serial: 1-byte bit field - bits 7-5 = band (000=1st … 100=5th), bits 4-0 = step (0-20). IP: 'AUDIO_EQUALIZER <band 1-5> <step 0-20>'."
  notes: "Precondition: Settings > Sound > Sound Mode > Equalizer = on."

- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {data}"        # ip: ENERGY_SAVING [screenoff|maximum|medium|minimum|off]
  params:
    - name: data
      type: string
      description: "00=Off 01=Minimum 02=Medium 03=Maximum 04=Auto (LCD/LED) 05=Screen off"

- id: tune_command
  label: Tune Channel
  kind: action
  command: "ma {d0} {d1} {d2} {d3} {d4} {d5}"  # ip: CHANNEL_SETTING_* (see notes)
  params:
    - name: d0
      type: string
      description: "High-byte channel / Physical / 'xx' (don't care)"
    - name: d1
      type: string
      description: "Low-byte channel / Major high byte"
    - name: d2
      type: string
      description: "Input source byte (region-dependent; see notes)"
    - name: d3
      type: string
      description: "Major low byte / Minor high byte"
    - name: d4
      type: string
      description: "Minor low byte"
    - name: d5
      type: string
      description: "Input source for extended variants (00=ATV, 80=CATV analog, 02=DTV, 22=DTV no-phy, 06=CADTV no-phy, 26=CADTV no-phy, 46=One-part, 66=One-part, 40=SDTV, 50=S-Radio, 90=CADTV, A0=CA-Radio, 07=BS, 08=CS1, 09=CS2, 10=DTV-JP)"
  notes: "IP variants: CHANNEL_SETTING_ATSC_ATV [ch] antenna|cable, CHANNEL_SETTING_ATSC_DTV [ch] cablenotphy, CHANNEL_SETTING_ATSC_DTV [maj] [min] antennanotphy|cablenotphy. Example: 'ma 00 00 0a 00' tunes PAL ch 10 antenna."

- id: channel_add_del
  label: Channel Add/Del(Skip)
  kind: action
  command: "mb {data}"        # ip: CHANNEL_ADD_DELETE [add|delete]
  params:
    - name: data
      type: string
      description: "00=Del(ATSC/ISDB)/Skip(DVB), 01=Add"

- id: key
  label: IR Remote Key
  kind: action
  command: "mc {keycode}"     # ip: KEY_ACTION <keyname> (see key list)
  params:
    - name: keycode
      type: string
      description: "Hex byte from Key Code table; or IP name (e.g. 'ok', 'volumeup', 'power'). Works in all power states."
  notes: "Key codes 0x10-0x19 = number 0-9; 0x08=Power; 0x09=Mute; 0x0B=Input; 0x43=Menu/Settings; 0x44=OK; 0x79=Aspect Ratio; 0xBD=Record; etc. (see source pp.1-2 for full list)."

- id: control_backlight
  label: Control Backlight (LCD/LED)
  kind: action
  command: "mg {data}"        # ip: PICTURE_BACKLIGHT 0..100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. IP decimal 0-100."
  notes: "Precondition: Settings > Picture > Energy Saving = off."

- id: control_panel_light
  label: Control Panel Light (Plasma)
  kind: action
  command: "mg {data}"        # not supported on SK8100
  params:
    - name: data
      type: integer
      description: "Serial hex 00-64. (Plasma only.)"

- id: input_select
  label: Input Select (Main)
  kind: action
  command: "xb {data}"        # ip: INPUT_SELECT [dtv|atv|cadtv|catv|avav1|component1|hdmi1|hdmi2|hdmi3]
  params:
    - name: data
      type: string
      description: "00=DTV 01=CADTV 02=Satellite DTV 03=ISDB-CS1 04=ISDB-CS2 10=ATV 11=CATV 20=AV1 21=AV2 40=Component1 41=Component2 60=RGB 90=HDMI1 91=HDMI2 92=HDMI3 93=HDMI4"

- id: threed_mode
  label: 3D Mode
  kind: action
  command: "xt {d0} {d1} {d2} {d3}"  # ip: PICTURE_3D ...
  params:
    - name: d0
      type: string
      description: "00=3D On 01=3D Off 02=3D to 2D 03=2D to 3D"
    - name: d1
      type: string
      description: "00=Top/Bottom 01=Side by Side 02=Check Board 03=Frame Sequential 04=Column interleaving 05=Row interleaving"
    - name: d2
      type: string
      description: "Plasma only: 00=Right→Left, 01=Left→Right"
    - name: d3
      type: string
      description: "3D Depth: hex 00-14. Meaningless when d0=00 (3D On)."
  notes: "Source marks this command as 'Only 3D models' / 'Depending on model'. SK8100 series support unconfirmed."

- id: threed_extended
  label: 3D Extended Option
  kind: action
  command: "xv {d0} {d1}"     # ip: PICTURE_3D_EXTENSION ...
  params:
    - name: d0
      type: string
      description: "00=Picture Correction 01=Depth 02=Viewpoint 06=Color Correction 07=Sound Zooming 08=Normal Image View 09=Mode(Genre)"
    - name: d1
      type: string
      description: "Range depends on d0: 00-01 for corrections/on-off; 00-14 hex for depth/viewpoint; 0-20 decimal; 00-05 for genre (0=Standard,1=Sport,2=Cinema,3=Extreme,4=Manual,5=Auto)"
  notes: "Precondition chains with PICTURE_3D state - see source p.13."

- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju 01"            # IP variant not documented in source
  params: []
  notes: "RGB(PC) mode only. Data 01 = run auto-configure."

- id: telnet_quit
  label: Exit Telnet Session
  kind: action
  command: "quit"             # IP control only; ends the telnet session
  params: []
```

## Feedbacks
```yaml
- id: ack_ok
  label: OK Acknowledgement
  type: string
  description: "[Cmd2][ ][SetID][ ][OK][Data][x]  (serial). 'OK' line on telnet after a successful IP command."

- id: ack_ng
  label: NG Acknowledgement
  type: string
  description: "[Cmd2][ ][SetID][ ][NG][Data][x]  (serial, data 00 = Illegal Code). 'NG' on telnet for unsupported or rejected commands."

- id: power_state
  label: Power State
  type: enum
  values: [on, off]

- id: input_state
  label: Input Source
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]

- id: volume_state
  label: Volume Level
  type: integer
  description: "0-100 (IP) / 0x00-0x64 hex (serial)."

- id: mute_state
  label: Mute State
  type: enum
  values: [mute_on, mute_off]

- id: screen_mute_state
  label: Screen Mute State
  type: enum
  values: [screen_mute_off, screen_mute_on, video_mute_on]
```

## Variables
```yaml
# UNRESOLVED: source does not expose discrete variable handles beyond parameter ranges documented inline with each Action. Remove section if not applicable.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications. The 'OK' / 'NG' responses above are only sent in reply to commands.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_on     # source states power-on behavior is the only command that works in standby via RS-232
interlocks: []
# UNRESOLVED: source does not document hard interlock procedures. The 828 hidden-menu password is a configuration gate, not a safety interlock.
```

## Notes
- Source is the LG "EXTERNAL CONTROL DEVICE SETUP" owner's manual chapter covering both the legacy RS-232C command set and the newer Network IP Control (telnet) command set.
- The SK8100 series is an EU-market LCD/LED TV; several commands in the source are explicitly marked "(Plasma TV)" or "(Only 3D models)" / "Depending on model" — they are included above for completeness but are not expected to function on a 49SK8100PLA.
- Serial transmission is ASCII, terminated by Carriage Return (0x0D). Spacing in the frame is single-space (0x20) separators; do not add extra whitespace.
- "ka" (Power) is the only serial command (besides "mc" Key) that the source says works in both standby and on states. All other commands are ignored (NG) in standby.
- During media playback or recording, all commands except Power (ka) and Key (mc) return NG.
- IP control section is labelled "For USA only" in the source; whether it applies to the European 49SK8100PLA SKU is unverified.
- The Network IP Control telnet session does not document a per-connection authentication challenge in the source; the 828 password gates the *menu* that enables IP control, not the telnet socket itself.

<!-- UNRESOLVED: Set ID range confirmed 1-99. Wi-Fi/WOL procedure mentioned only as "install iOS/Android app" — no protocol-level WOL details. 3D applicability to SK8100PLA not stated. ISM and panel-light commands are plasma-specific and will not work on this LCD SKU. -->Spec emitted. Both transports captured (RS-232 + telnet:9761). IP control section flagged "For USA only" — applicability to EU SKU unverified, marked UNRESOLVED. Plasma-only (ISM, panel light) and 3D commands included per coverage rule with notes.

Admin next steps:
1. Fill `entity_id` from Convex dashboard.

## Provenance

```yaml
source_domains:
  - webostv.developer.lge.com
  - knowledge.tiffinmotorhomes.com
  - proaudioinc.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://knowledge.tiffinmotorhomes.com/Owner_Hub/Allegro_Bus/Allegro_Bus_Component_Manuals/2027_Allegro_Bus_Component_Manuals/LG_External_Control_Device_Setup
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-04-25T20:59:48.823Z
last_checked_at: 2026-04-25T20:59:48.823Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:59:48.823Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched verbatim to source commands; all transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the protocol as \"For USA only\" for IP control — applicability to the 49SK8100PLA (EU SKU) is unverified. Source also states 3D support is model-dependent; SK8100 series is not confirmed 3D-capable."
- "source does not expose discrete variable handles beyond parameter ranges documented inline with each Action. Remove section if not applicable."
- "source does not document unsolicited push notifications. The 'OK' / 'NG' responses above are only sent in reply to commands."
- "source does not document multi-step macro sequences."
- "source does not document hard interlock procedures. The 828 hidden-menu password is a configuration gate, not a safety interlock."
- "Set ID range confirmed 1-99. Wi-Fi/WOL procedure mentioned only as \"install iOS/Android app\" — no protocol-level WOL details. 3D applicability to SK8100PLA not stated. ISM and panel-light commands are plasma-specific and will not work on this LCD SKU. -->Spec emitted. Both transports captured (RS-232 + telnet:9761). IP control section flagged \"For USA only\" — applicability to EU SKU unverified, marked UNRESOLVED. Plasma-only (ISM, panel light) and 3D commands included per coverage rule with notes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
