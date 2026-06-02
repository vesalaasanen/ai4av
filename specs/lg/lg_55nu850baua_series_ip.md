---
spec_id: admin/lg-55nu850baua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55NU850BAUA Series Control Spec"
manufacturer: LG
model_family: 55NU850BAUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55NU850BAUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - webostv.developer.lge.com
  - proaudioinc.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://webostv.developer.lge.com/develop/references/audio
  - https://webostv.developer.lge.com/develop/references/tv-device-information
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T17:23:04.920Z
last_checked_at: 2026-06-02T17:23:04.920Z
generated_at: 2026-06-02T17:23:04.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Network IP Control is documented as USA-only; worldwide IP-control availability is not stated. Firmware-version-specific feature availability is not stated."
  - "source does not document unsolicited notifications from the TV"
  - "source does not document any multi-step macro sequences that the"
  - "firmware version not stated in source. Set-ID/feature availability per firmware revision not stated. Network IP Control region coverage beyond \"USA only\" not stated. Full IP-control command set may include AUDIO_TREBLE / AUDIO_BASS that the source's IP section did not list explicitly. 3D support on 55NU850BAUA is not stated in this source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:04.920Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions match verbatim in the refined source; transport parameters verified; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 55NU850BAUA Series Control Spec

## Summary

Control spec for LG 55NU850BAUA series TV. Covers RS-232 (DE9 or phone-jack, 9600 8N1 ASCII) and Network IP Control (TCP telnet, port 9761; USA only). RS-232 protocol uses ASCII framed as `[Cmd1][Cmd2][ ][SetID][ ][Data][Cr]`; IP protocol uses plaintext verbs followed by parameters and a `quit` to disconnect.

<!-- UNRESOLVED: Network IP Control is documented as USA-only; worldwide IP-control availability is not stated. Firmware-version-specific feature availability is not stated. -->

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
addressing:
  port: 9761
auth:
  type: none  # inferred: telnet connection procedure in source requires no credentials; the 828 code is the on-TV menu password to enable IP control, not a connection auth
```

## Traits
```yaml
- powerable       # ka / POWER
- routable        # xb / INPUT_SELECT
- queryable       # FF-data status reads for most commands
- levelable       # volume / brightness / contrast / colour / tint / sharpness / treble / bass / balance / backlight / colour temperature
```

## Actions
```yaml
# Coverage note: both RS-232 and Network IP Control forms are documented in the
# source. `command` carries the RS-232 ASCII form (universal); the IP-control
# text form is recorded in `notes` for each action. For RS-232 use
# [Cmd1][Cmd2][ ][SetID][ ][Data][Cr] with SetID "00" for all sets, and "[Cr]"
# is 0x0D. Use "FF" as data to query status of any command that supports it.

# ---------------- 01. Power ----------------
- id: power
  label: Power
  kind: action
  command: "ka {data}"
  params:
    - name: data
      type: enum
      description: "00 = Power Off, 01 = Power On"
      values: ["00", "01"]
  notes: |
    RS-232: "ka [SetID] [Data]". Query with data FF.
    IP control: "POWER on" / "POWER off".

# ---------------- 02. Aspect Ratio ----------------
- id: aspect_ratio
  label: Aspect Ratio (Main Picture Size)
  kind: action
  command: "kc {data}"
  params:
    - name: data
      type: enum
      description: "01=Normal(4:3), 02=Wide(16:9), 04=Zoom, 05=Zoom2, 06=Set by Program/Original, 07=14:9, 09=Just Scan, 0B=Full Wide, 0C=21:9, 10..1F=Cinema Zoom 1..16"
      values: ["01","02","04","05","06","07","09","0B","0C","10","11","12","13","14","15","16","17","18","19","1A","1B","1C","1D","1E","1F"]
  notes: |
    RS-232: "kc [SetID] [Data]".
    IP control: "ASPECT_RATIO [4by3|16by9|setbyoriginal]".
    21:9, Just Scan, Full Wide availability is model/signal dependent per source.

# ---------------- 03. Screen Mute ----------------
- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {data}"
  params:
    - name: data
      type: enum
      description: "00 = Screen mute off (Picture on, Video mute off), 01 = Screen mute on (Picture off), 10 = Video mute on"
      values: ["00","01","10"]
  notes: |
    RS-232: "kd [SetID] [Data]".
    IP control: "SCREEN_MUTE [screenmuteon|videomuteon|allmuteoff]".

# ---------------- 04. Volume Mute ----------------
- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {data}"
  params:
    - name: data
      type: enum
      description: "00 = Volume mute on, 01 = Volume mute off"
      values: ["00","01"]
  notes: |
    RS-232: "ke [SetID] [Data]". Query with data FF.
    IP control: "VOLUME_MUTE [on|off]".

# ---------------- 05. Volume Control ----------------
- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64 (decimal 0..100)"
  notes: |
    RS-232: "kf [SetID] [Data]". Query with data FF.
    IP control: "VOLUME_CONTROL [0 to 100]" (decimal).

# ---------------- 06. Contrast ----------------
- id: contrast
  label: Contrast
  kind: action
  command: "kg {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "kg [SetID] [Data]". Query with data FF.
    IP control: "PICTURE_CONTRAST [0 to 100]" (decimal).

# ---------------- 07. Brightness ----------------
- id: brightness
  label: Brightness
  kind: action
  command: "kh {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "kh [SetID] [Data]". Query with data FF.
    IP control: "PICTURE_BRIGHTNESS [0 to 100]" (decimal).

# ---------------- 08. Color/Colour ----------------
- id: color
  label: Color/Colour
  kind: action
  command: "ki {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "ki [SetID] [Data]". Query with data FF.
    IP control: "PICTURE_COLOUR [0 to 100]" (decimal).

# ---------------- 09. Tint ----------------
- id: tint
  label: Tint
  kind: action
  command: "kj {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64; 00 = Red, 64 = Green"
  notes: |
    RS-232: "kj [SetID] [Data]". Query with data FF.
    IP control: "PICTURE_TINT [0 to 100]" (decimal).
    Note: source documents Ack letter as "r" (likely typo) for this command.

# ---------------- 10. Sharpness ----------------
- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..32"
  notes: |
    RS-232: "kk [SetID] [Data]". Query with data FF.
    IP control: "PICTURE_SHARPNESS [0 to 50]" (decimal).

# ---------------- 11. OSD Select ----------------
- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {data}"
  params:
    - name: data
      type: enum
      description: "00 = OSD off, 01 = OSD on"
      values: ["00","01"]
  notes: |
    RS-232: "kl [SetID] [Data]".
    IP control: "OSD_SELECT [on|off]".

# ---------------- 12. Remote Control Lock Mode ----------------
- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  command: "km {data}"
  params:
    - name: data
      type: enum
      description: "00 = Lock off, 01 = Lock on"
      values: ["00","01"]
  notes: |
    RS-232: "km [SetID] [Data]".
    IP control: "REMOTECONTROLER_LOCK [on|off]".
    Per source, external control lock is released when main power cycles
    (plug-off/plug-in, 20-30 s). Lock + standby prevents IR/local-key power-on.

# ---------------- 13. Treble ----------------
- id: treble
  label: Treble
  kind: action
  command: "kr {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "kr [SetID] [Data]".
    IP control: not explicitly listed as a separate AUDIO_TREBLE command in the
    IP section; only AUDIO_BALANCE is named. UNRESOLVED whether Treble is
    reachable via IP.

# ---------------- 14. Bass ----------------
- id: bass
  label: Bass
  kind: action
  command: "ks {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "ks [SetID] [Data]".
    IP control: not explicitly listed as a separate AUDIO_BASS command in the
    IP section. UNRESOLVED whether Bass is reachable via IP.

# ---------------- 15. Balance ----------------
- id: balance
  label: Balance
  kind: action
  command: "kt {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "kt [SetID] [Data]". Query with data FF.
    IP control: "AUDIO_BALANCE [0 to 100]" (decimal).

# ---------------- 16. Color(Colour) Temperature ----------------
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "xu [SetID] [Data]".
    IP control: "PICTURE_COLOUR_TEMPERATURE [0 to 100]" (decimal).

# ---------------- 17. ISM Method (Plasma only) ----------------
- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {data}"
  params:
    - name: data
      type: enum
      description: "02 = Orbiter, 08 = Normal, 20 = Color(Colour) Wash"
      values: ["02","08","20"]
  notes: |
    RS-232: "jp [SetID] [Data]". Plasma TV only per source. Not applicable to
    55NU850BAUA (LED). UNRESOLVED whether IP control offers ISM.

# ---------------- 18. Equalizer ----------------
- id: equalizer
  label: Equalizer
  kind: action
  command: "jv {data}"
  params:
    - name: data
      type: string
      description: |
        10-bit (2 hex byte) value packed as 3 bits band select + 5 bits step
        (0..20 decimal). Bits 7-5 = frequency band: 000=1st, 001=2nd, 010=3rd,
        011=4th, 100=5th. Bits 4-0 = step (0..20 decimal).
  notes: |
    RS-232: "jv [SetID] [Data]" where Data is a 2-byte hex value.
    IP control: "AUDIO_EQUALIZER [1 to 5] [0 to 20]".
    Precondition: All settings > sound > sound mode settings > Equalizer on.
    EQ adjust availability depends on model/sound mode.

# ---------------- 19. Energy Saving ----------------
- id: energy_saving
  label: Energy Saving
  kind: action
  command: "jq {data}"
  params:
    - name: data
      type: enum
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto (LCD/LED) / Intelligent sensor (PDP), 05=Screen off"
      values: ["00","01","02","03","04","05"]
  notes: |
    RS-232: "jq [SetID] [Data]".
    IP control: "ENERGY_SAVING [screenoff|maximum|medium|minimum|off]".

# ---------------- 20. Tune Command ----------------
- id: tune_command
  label: Tune Command
  kind: action
  command: "ma {data00} {data01} {data02}"
  params:
    - name: data00
      type: string
      description: "High byte channel / source-dependent"
    - name: data01
      type: string
      description: "Low byte channel / major-channel high / don't-care"
    - name: data02
      type: string
      description: "Source-select: 00=ATV, 10=DTV, 20=Radio, 40=SDTV, 50=S-Radio, 80=CATV, 90=CADTV, A0=CA-Radio; also 01=CATV (ATSC NTSC), 22=DTV no-physical, 26=CADTV no-physical, 46=CADTV one-part, 66=CADTV major-only"
  notes: |
    RS-232: "ma [SetID] [Data00] [Data01] [Data02] [Cr]" for EU/ME/CO/Asia
    analog 2-byte form; 6-byte form "ma 0 [D00][D01][D02][D03][D04][D05]" for
    digital/ATSC/ISDB and Japan.
    IP control:
      CHANNEL_SETTING_ATSC_ATV [Channel] antenna
      CHANNEL_SETTING_ATSC_ATV [Channel] cable
      CHANNEL_SETTING_ATSC_DTV [Channel] cablenotphy
      CHANNEL_SETTING_ATSC_DTV [Maj] [Min] antennanotphy
      CHANNEL_SETTING_ATSC_DTV [Maj] [Min] cablenotphy
    Channel-number range, physical/major/minor encoding, and source-code
    mapping per region; full per-region table is in source.

# ---------------- 21. Channel Add/Del (Skip) ----------------
- id: channel_add_del
  label: Channel Add/Del (Skip)
  kind: action
  command: "mb {data}"
  params:
    - name: data
      type: enum
      description: "00 = Del(ATSC/ISDB)/Skip(DVB), 01 = Add"
      values: ["00","01"]
  notes: |
    RS-232: "mb [SetID] [Data]".
    IP control: "CHANNEL_ADD_DELETE [add|delete]".

# ---------------- 22. Key (IR remote code) ----------------
- id: key
  label: Key (IR remote code)
  kind: action
  command: "mc {key_code}"
  params:
    - name: key_code
      type: enum
      description: |
        Hex byte per Key Codes table. Defined codes:
        00=CH+/PR+, 01=CH-/PR-, 02=Vol+, 03=Vol-, 06=Right, 07=Left, 08=Power,
        09=Mute, 0B=Input, 0E=Sleep, 0F=TV, 10-19=Number 0-9, 1A=Q.View/Flashback,
        1E=FAV, 20=Teletext, 21=T.Opt, 28=Return(BACK), 30=AV Mode, 39=Caption,
        40=Up, 41=Down, 42=My Apps, 43=Menu/Settings, 44=OK, 45=Q.Menu,
        4C=List (ATSC/ISDB only), 4D=PICTURE, 52=SOUND, 53=List, 5B=Exit,
        60=PIP(AD), 61=Blue, 63=Yellow, 71=Green, 72=Red, 79=Ratio/Aspect,
        7A=User Guide, 7C=Smart/Home, 7E=SIMPLINK, 8E=Forward, 8F=Rewind,
        91=AD(Audio Description), 99=AutoConfig, 9B=TV/PC, 9E=LIVE MENU,
        9F=App/*, AA=Info, AB=Program Guide, B0=Play, B1=Stop/File List,
        B5=RECENT, BA=Freeze/Slow/Pause, BB=Soccer, BD=REC, DC=3D.
  notes: |
    RS-232: "mc [SetID] [KeyCode]". Sent data as hex byte.
    IP control: "KEY_ACTION [exit|channelup|channeldown|volumeup|volumedown|
    arrowright|arrowleft|volumemute|deviceinput|sleepreserve|livetv|
    previouschannel|favoritechannel|teletext|teletextoption|returnback|avmode|
    captionsubtitle|arrowup|arrowdown|myapp|settingmenu|ok|quickmenu|videomode|
    audiomode|channellist|bluebutton|yellowbutton|greenbutton|redbutton|
    aspectratio|audiodescription|programmorder|userguide|smarthome|simplelink|
    fastforward|rewind|programminfo|programguide|play|slowplay|soccerscreen|
    record|3d|autoconfig|app|screenbright|number0..number9]".
    Per source: "During playing or recording media, all commands except Power
    (ka) and Key (mc) are not executed and treated as NG."

# ---------------- 23. Control Backlight / Control Panel Light ----------------
- id: control_backlight
  label: Control Backlight (or Panel Light)
  kind: action
  command: "mg {data}"
  params:
    - name: data
      type: integer
      description: "Hex 00..64"
  notes: |
    RS-232: "mg [SetID] [Data]". Source documents this same op for both
    "Control Backlight" and "Control Panel Light" (PDP).
    IP control: "PICTURE_BACKLIGHT [0 to 100]" (decimal).
    Precondition for IP: All settings > picture > Energy Saving off.

# ---------------- 24. Input Select (Main) ----------------
- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "xb {data}"
  params:
    - name: data
      type: enum
      description: |
        00=DTV, 01=CADTV, 02=Satellite DTV, 03=ISDB-CS1 (Japan), 04=ISDB-CS2
        (Japan), 10=ATV, 11=CATV, 20=AV or AV1, 21=AV2, 40=Component1,
        41=Component2, 60=RGB, 90=HDMI1, 91=HDMI2, 92=HDMI3, 93=HDMI4,
        ISDB-BS (Japan).
      values: ["00","01","02","03","04","10","11","20","21","40","41","60","90","91","92","93"]
  notes: |
    RS-232: "xb [SetID] [Data]". Some input codes are Japan-only and may not
    apply to 55NU850BAUA. Function depends on model/signal per source.
    IP control: "INPUT_SELECT [dtv|atv|cadtv|catv|avav1|component1|hdmi1|hdmi2|hdmi3]".

# ---------------- 25. 3D (3D models only) ----------------
- id: three_d
  label: 3D
  kind: action
  command: "xt {data00} {data01} {data02} {data03}"
  params:
    - name: data00
      type: enum
      description: "00=3D On, 01=3D Off, 02=3D to 2D, 03=2D to 3D"
      values: ["00","01","02","03"]
    - name: data01
      type: enum
      description: "00=Top/Bottom, 01=Side-by-Side, 02=Check Board, 03=Frame Sequential, 04=Column interleaving, 05=Row interleaving"
      values: ["00","01","02","03","04","05"]
    - name: data02
      type: enum
      description: "00=Right to Left, 01=Left to Right (Plasma only per source)"
      values: ["00","01"]
    - name: data03
      type: string
      description: "Hex 00..14 = 3D Effect / depth. Ignored when data00=00; data01..03 ignored when data00=01 or 02; data02 ignored when data00=03"
  notes: |
    RS-232: "xt [SetID] [D00] [D01] [D02] [D03]".
    IP control forms:
      PICTURE_3D [off|3dto2d]
      PICTURE_3D 2dto3d [righttoleft|lefttoright] [0 to 20]
      PICTURE_3D on [topandbottom|sidebyside|checkboard|framesequential|columninterleaving|rowinterleaving] [righttoleft|lefttoright] [0 to 20]
    3D model precondition. UNRESOLVED whether 55NU850BAUA supports 3D.

# ---------------- 26. Extended 3D (3D models only) ----------------
- id: extended_3d
  label: Extended 3D
  kind: action
  command: "xv {data00} {data01}"
  params:
    - name: data00
      type: enum
      description: "00=3D Picture Correction, 01=3D Depth (manual only), 02=3D Viewpoint, 06=3D Color Correction, 07=3D Sound Zooming, 08=Normal Image View, 09=3D Mode (Genre)"
      values: ["00","01","02","06","07","08","09"]
    - name: data01
      type: string
      description: "Per-option value; range depends on data00 (00/01 L-R swap, 01/02 0..14 hex = -10..+10 viewpoint, 06/07 0/1, 08 0/1, 09 0=Standard..5=Auto)"
  notes: |
    RS-232: "xv [SetID] [D00] [D01]".
    IP control forms:
      PICTURE_3D_EXTENSION picturecorrection [0|1]
      PICTURE_3D_EXTENSION [colorcorrection|sound] [0|1]
      PICTURE_3D_EXTENSION normal [0|1]
      PICTURE_3D_EXTENSION [depth|viewpoint] [0 to 20]
      PICTURE_3D_EXTENSION genre [0 to 5]
    Preconditions vary by sub-option (PICTURE_3D on ...; PICTURE_3D_EXTENSION
    genre 4 for depth/viewpoint). 3D model precondition.

# ---------------- 27. Auto Configure ----------------
- id: auto_configure
  label: Auto Configure
  kind: action
  command: "ju {data}"
  params:
    - name: data
      type: enum
      description: "01 = To set Auto Configure"
      values: ["01"]
  notes: |
    RS-232: "ju [SetID] [Data]". Adjusts picture position / minimizes image
    shaking. Works only in RGB (PC) input per source.

# ---------------- Network IP Control: Connect/Disconnect ----------------
- id: ip_control_quit
  label: IP Control - Quit
  kind: action
  command: "quit"
  params: []
  notes: |
    IP control only. Plain "quit" + Enter disconnects the telnet session.
    Response: "Connection closed by foreign host".

# ---------------- Network IP Control: 3D extensions (IP forms for completeness) ----------------
- id: picture_3d_extension_genre
  label: 3D Mode (Genre)
  kind: action
  command: "PICTURE_3D_EXTENSION genre {value}"
  params:
    - name: value
      type: enum
      description: "0=Standard, 1=Sport, 2=Cinema, 3=Extreme, 4=Manual, 5=Auto"
      values: ["0","1","2","3","4","5"]
  notes: |
    IP control only. Precondition: PICTURE_3D 2dto3d X X.
    RS-232 equivalent: xv with data00=09.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: volume_mute_state
  type: enum
  values: [on, off]
- id: osd_select_state
  type: enum
  values: [on, off]
- id: remote_control_lock_state
  type: enum
  values: [on, off]
- id: aspect_ratio_state
  type: enum
  values: ["normal_4_3","wide_16_9","zoom","zoom2","set_by_program","14_9","just_scan","full_wide","21_9","cinema_zoom_1","cinema_zoom_2","cinema_zoom_3","cinema_zoom_4","cinema_zoom_5","cinema_zoom_6","cinema_zoom_7","cinema_zoom_8","cinema_zoom_9","cinema_zoom_10","cinema_zoom_11","cinema_zoom_12","cinema_zoom_13","cinema_zoom_14","cinema_zoom_15","cinema_zoom_16"]
- id: screen_mute_state
  type: enum
  values: [screen_mute_off, screen_mute_on, video_mute_on]
- id: energy_saving_state
  type: enum
  values: [off, minimum, medium, maximum, auto, screen_off]
- id: channel_add_del_state
  type: enum
  values: [del, add]
- id: input_select_state
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4, isdb_bs]
- id: volume_level
  type: integer
  description: "0..100 (decimal); RS-232 hex 00..64"
- id: contrast_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: brightness_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: color_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: tint_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64 (00=Red, 64=Green)"
- id: sharpness_level
  type: integer
  description: "0..50 decimal; RS-232 hex 00..32"
- id: treble_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: bass_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: balance_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: color_temperature_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: backlight_level
  type: integer
  description: "0..100 decimal; RS-232 hex 00..64"
- id: equalizer_band_step
  type: object
  description: |
    Per-band EQ step 0..20 decimal; 5 bands. RS-232 packs band+step in a
    10-bit (2 hex byte) value. IP control: "AUDIO_EQUALIZER [1..5] [0..20]".
- id: three_d_state
  type: object
  description: "3D On / Off / 3D-to-2D / 2D-to-3D + pattern + L/R + depth. Hex 0..14."
- id: ack
  type: enum
  values: [ok, ng]
  description: |
    RS-232 acknowledgement: "[Cmd2] [SetID] OK/NG [Data] [x]". NG data 00 = illegal code.
    IP control: "OK" / "NG" / on success returns "OK".
- id: current_channel
  type: object
  description: "Tune command ack returns [Data00..Data02] (or [Data00..Data05] for digital/ATSC/ISDB). Field semantics documented in tune_command notes."
```

## Variables
```yaml
- id: set_id
  type: integer
  description: "1..99 decimal, 0x00..0x63 hex. '00' = broadcast to all sets. Configured via TV menu (SETTINGS > General/OPTION > SET ID)."
- id: ip_control_password
  type: string
  description: "3-digit numeric code; default 828. Used only to enter the on-TV IP Control Setup menu, not the telnet session auth."
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the TV
# over either RS-232 or IP control. All device-initiated traffic appears to be
# only command acks.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences that the
# device can execute natively. IP control section explicitly states that all
# commands except Power (ka) and Key (mc) are treated as NG during media
# play or record.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: media_play_blocks_commands
    description: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG."
  - id: remote_lock_blocks_ir
    description: "If remote-control lock is on, TV will not turn on by power-on key of IR or Local Key while in standby (DC off by off-timer or 'ka'/'mc' command)."
  - id: lock_releases_on_power_cycle
    description: "When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released."
```

## Notes

**Transport notes**
- RS-232 is the primary, universal interface. ASCII framed as `[Cmd1][Cmd2] [SetID] [Data][Cr]`. `[Cr]` is 0x0D, the space delimiter is 0x20. SetID '00' = all sets; SetID '1..99' (decimal) for individual sets. Use a crossed (reverse) cable. Source states "Cable is not provided" and "type of control port can be different between model series"; some models use DE9 (D-Sub 9-pin female-to-female) RS-232, some use phone-jack RS-232, and some have only a USB port (in which case LG documents the PL2303 chip-based USB-to-serial converter, Vendor ID 0x0557, Product ID 0x2008).
- Network IP Control is documented in the source as "For USA only". It is enabled via the TV's hidden IP Control Setup menu (default 3-digit password 828, changeable in-menu). Once enabled, the TV opens TCP port 9761 (telnet). Connect with `telnet <ip> 9761`; no login prompt is described. Send commands, one per line, ending with Enter; TV replies `OK` or `NG`. Disconnect with `quit`. WOL (Wake-on-LAN) power-on is supported if "Mobile TV On" is enabled in the on-device Settings menu and a WOL app is installed on a phone — wake packet is not further specified in this source.
- Baud 9600 8N1 is the only serial config documented.
- Source explicitly warns: during media play or record, all commands except `ka` and `mc` are treated as NG.

**Vendor-doc inconsistencies observed**
- 09. Tint command lists Ack-letter as `r` while every other command acks with its own Cmd2 letter (`j`); this looks like a typo in the vendor doc.
- 21. Channel Add/Del is also available via a second IP control form (CHANNEL_ADD_DELETE).
- 3D / Extended 3D command families are documented as "only 3D models" and "Depending on model"; applicability to the 55NU850BAUA is not confirmed in this source.
- ISM Method (jp) is documented as Plasma-only and is not applicable to this LED model.
- 22. Key (mc) lists key 4C (0x4C) as "available on ATSC/ISDB models which use major/minor channel" and excludes South Korea, Japan, North America, Latin America except Colombia — note the table is internally inconsistent (it also says the 4C key is "List, - (ATSC Only)").


<!-- UNRESOLVED: firmware version not stated in source. Set-ID/feature availability per firmware revision not stated. Network IP Control region coverage beyond "USA only" not stated. Full IP-control command set may include AUDIO_TREBLE / AUDIO_BASS that the source's IP section did not list explicitly. 3D support on 55NU850BAUA is not stated in this source. -->
```

Self-check: no voltage/current/power invented; no ports assumed (9761 + 9600 baud stated); status=draft; confidence=low; YAML quoted; entity_id placeholder present; UNRESOLVED markers present for IP-control scope, firmware, and per-feature availability.

## Provenance

```yaml
source_domains:
  - webostv.developer.lge.com
  - proaudioinc.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://webostv.developer.lge.com/develop/references/audio
  - https://webostv.developer.lge.com/develop/references/tv-device-information
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-02T17:23:04.920Z
last_checked_at: 2026-06-02T17:23:04.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:04.920Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions match verbatim in the refined source; transport parameters verified; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Network IP Control is documented as USA-only; worldwide IP-control availability is not stated. Firmware-version-specific feature availability is not stated."
- "source does not document unsolicited notifications from the TV"
- "source does not document any multi-step macro sequences that the"
- "firmware version not stated in source. Set-ID/feature availability per firmware revision not stated. Network IP Control region coverage beyond \"USA only\" not stated. Full IP-control command set may include AUDIO_TREBLE / AUDIO_BASS that the source's IP section did not list explicitly. 3D support on 55NU850BAUA is not stated in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
